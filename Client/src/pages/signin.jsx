import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../rudex/user/userSlice';
import OAuth from '../components/OAuth';

export default function signin() {
    const [formData, setformData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChanges = (event) => {
        setformData({
            ...formData,
            [event.target.id]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(signInStart());
            const response = await fetch("/api/auth/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message))
                return;
            }
            dispatch(signInSuccess(data))
            navigate("/")

        } catch (error) {
            dispatch(signInFailure(error.message))
        }

    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Signin</h1>

            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                {/* <input id='username' type='text' placeholder='Username' className='border p-3 rounded-lg' onChange={handleChanges} /> */}
                <input id='email' type='email' placeholder='email' className='border p-3 rounded-lg' onChange={handleChanges} />
                <input id='password' type='password' placeholder='Password' className='border p-3 rounded-lg' onChange={handleChanges} />

                <button disabled={loading} className='bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'SignIn'}
                </button>
                <OAuth />
            </form>

            <div className='flex gap-2 mt-5'>
                <p>Dont have an Account ?</p>
                <Link to={"/sign-up"}>
                    <span className='text-blue-700 font-semibold'>Signup</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}

        </div>
    )
}
