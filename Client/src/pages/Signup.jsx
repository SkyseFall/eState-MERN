import React from 'react';
import { Link } from 'react-router-dom'

export default function signup() {
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Signup</h1>

            <form className='flex flex-col gap-4'>
                <input id='username' type='text' placeholder='Username' className='border p-3 rounded-lg' />
                <input id='email' type='email' placeholder='email' className='border p-3 rounded-lg' />
                <input id='password' type='password' placeholder='Password' className='border p-3 rounded-lg' />

                <button className='bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
            </form>

            <div className='flex gap-2 mt-5'>
                <p>Already having an Account ?</p>
                <Link to={"/sign-in"}>
                    <span className='text-blue-700 font-semibold'>SignIn</span>
                </Link>
            </div>

        </div>
    )
}
