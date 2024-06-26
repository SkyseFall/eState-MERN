import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';


export default function signup() {

    const [formData, setformData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChanges = (event) => {
        setformData({
            ...formData,
            [event.target.id]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await fetch("/api/auth/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate("/sign-in")

        } catch (error) {
            setLoading(false);
            setError(error.message);
        }

    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Signup</h1>

            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input id='username' type='text' placeholder='Username' className='border p-3 rounded-lg' onChange={handleChanges} />
                <input id='email' type='email' placeholder='email' className='border p-3 rounded-lg' onChange={handleChanges} />
                <input id='password' type='password' placeholder='Password' className='border p-3 rounded-lg' onChange={handleChanges} />

                <button disabled={loading} className='bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'SignUp'}
                </button>
                <OAuth />
            </form>

            <div className='flex gap-2 mt-5'>
                <p>Already having an Account ?</p>
                <Link to={"/sign-in"}>
                    <span className='text-blue-700 font-semibold'>SignIn</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}

        </div>
    )
}
