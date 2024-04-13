import { React, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { appFirebase } from '../firebase';

export default function profile() {
    const { currentUser } = useSelector(state => state.user);
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined)
    const [filePrecent, setfilePercent] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});

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
                setFileUploadError(truue);
            },
            () => {
                getDownloadURL(uploadtask.snapshot.ref).then
                    ((downloadURL) => {
                        setFormData({ ...formData, avatar: downloadURL });
                    })
            });

    }

    // firebase storage ->
    // allow read;
    //   allow write: if
    //   request.resource.size<2*1024*1024 &&
    //   request.resource.contentType.matches('image/.*');


    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <input
                    onChange={(e) => setFile(e.target.files[0])} type='file'
                    ref={fileRef}
                    hidden
                    accept='image/*' />
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

                <input id='username' type='text' placeholder='Username' className='border p-3 rounded-lg ' />
                <input id='email' type='email' placeholder='email' className='border p-3 rounded-lg ' />
                <input id='password' type='password' placeholder='password' className='border p-3 rounded-lg ' />
                <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor cursor-pointer'>Sign out</span>
            </div>
        </div >
    )
}
