import { React, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { appFirebase } from '../firebase';
import { updateUserFailure, updateUserSuccess, updateUserStart, deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutUserFailure, signoutUserStart, signoutUserSuccess } from '../rudex/user/userSlice';
import { useDispatch } from 'react-redux';

export default function profile() {
    const { currentUser, loading, error } = useSelector(state => state.user);
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined)
    const [filePrecent, setfilePercent] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccessMsg, setUpdateSuccessMsg] = useState(false);

    const dispatch = useDispatch();

    console.log("Upadte", formData)


    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file])


    const handleFileUpload = (file) => {
        const storage = getStorage(appFirebase);
        const fileName = new Date().getTime() + file.name; // for unqui name
        const storageRef = ref(storage, fileName);
        const uploadtask = uploadBytesResumable(storageRef, file);

        uploadtask.on("state_changed",
            (snapshot) => {
                const progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setfilePercent(Math.round(progess));
                console.log("upload is", progess + "% done")
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadtask.snapshot.ref).then
                    ((downloadURL) => {
                        setFormData({ ...formData, avatar: downloadURL });
                    })
            });

    }
    const handleUpdate = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`api/user/update/${currentUser._id}`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "content-type": "application/json"
                    // "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccessMsg(true)
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    }

    const handleDeleteUserAccount = async (e) => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`api/user/delete/${currentUser._id}`, {
                method: "DELETE",
            })

            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message))

        }

    }

    const handleSignout = async (e) => {
        try {
            dispatch(signoutUserStart());
            const res = await fetch("api/auth/signout");
            const data = await res.json();
            if (data.success === false) {
                dispatch(signoutUserFailure(data.message));
                return;
            }
            dispatch(signoutUserSuccess(data));
        } catch (error) {
            dispatch(signoutUserFailure(error.message))
        }
    }

    // firebase storage ->
    // allow read;
    //   allow write: if
    //   request.resource.size<2*1024*1024 &&
    //   request.resource.contentType.matches('image/.*');


    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    onChange={(e) => setFile(e.target.files[0])} type='file'
                    ref={fileRef}
                    hidden
                    accept='image/*'
                />
                <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='profile_photo' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

                <p className='self-center'>
                    {fileUploadError ?
                        (<span className='text-red-700'>Error Image upload</span>)
                        :
                        filePrecent > 0 && filePrecent < 100 ?
                            (<span className='text-slate-700'>{`uploading $(filePrecent)%`}</span>)
                            : filePrecent === 100 ?
                                (<span className='text-blue-700'>Image successfully uploaded1</span>)
                                : (
                                    ''
                                )}
                </p>

                <input id='username' type='text' placeholder='Username' defaultValue={currentUser.username} onChange={handleUpdate} className='border p-3 rounded-lg ' />
                <input id='email' type='email' placeholder='email' defaultValue={currentUser.email} onChange={handleUpdate} className='border p-3 rounded-lg ' />
                <input id='password' type='password' placeholder='password' onChange={handleUpdate} className='border p-3 rounded-lg ' />
                <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'loading...' : "update"}
                </button>
            </form>
            <div className='flex justify-between mt-5'>
                <span onClick={handleDeleteUserAccount} className='text-red-700  cursor-pointer'>Delete Account</span>
                <span onClick={handleSignout} className='text-red-700  cursor-pointer'>Sign out</span>
            </div>
            <p className='text-red-700 mt-5'>
                {error ? error : ""}
            </p>

            {updateSuccessMsg ? <p className='text-green-700 mt-5'>User Update Successfully</p> : <p></p>}
        </div >
    )
}
