import React, { useState } from 'react';
import SignInWithFacebookBtn from '../components/SignInWithFacebookBtn';
import SignInWithGoogleBtn from '../components/SignInWithGoogleBtn';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerificationPage = () => {

    const CLIENT_ID = "90952135970-jt1ghjsrlql93ncfhfgmlpdatp4k16dj.apps.googleusercontent.com"


    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("https://mern-metaverse-krish.vercel.app/api/register-verification", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, code }),
        })

        const resMsg = await res.json();

        toast(resMsg.message)

        if (res.ok) {
            setEmail("")
            setCode("")
        }

    }
    return (
        <div className="flex items-center justify-center py-36 bg-gray-100">

            <ToastContainer />

            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Verify Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                            Code
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="code"
                            type="text"
                            placeholder="Enter your code"
                            value={code}
                            name='code'
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        Verify
                    </button>

                    <div className='text-center my-4'>
                        Doesn't have an account? <Link to="/signup" className='text-blue-700 underline'> Sign Up </Link>
                    </div>

                    <div className='text-center my-4'>
                        Already verified your an account? <Link to="/signin" className='text-blue-700 underline'> Sign in </Link>
                    </div>

                    <div className="flex items-center justify-center mb-4">
                        <div className="w-1/2 border-t-2 border-gray-300"></div>
                        <div className="mx-4 text-gray-500 font-semibold">or</div>
                        <div className="w-1/2 border-t-2 border-gray-300"></div>
                    </div>


                    <div className='flex justify-center gap-x-3 items-center'>
                        <SignInWithGoogleBtn CLIENT_ID={CLIENT_ID} />
                    </div>

                    <div className='flex justify-center gap-x-3 items-center mt-5'>
                        <SignInWithFacebookBtn />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default VerificationPage;
