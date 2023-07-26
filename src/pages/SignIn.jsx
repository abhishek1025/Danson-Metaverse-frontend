import React, { useState } from 'react';
import SignInWithFacebookBtn from '../components/SignInWithFacebookBtn';
import SignInWithGoogleBtn from '../components/SignInWithGoogleBtn';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCookie, destroyCookie } from '../utils/cookies.utils';
import { useUserIdentifierContext } from '../Hooks/useUserIdentifierContext';


const SignIn = () => {

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

    const { setUserIdentifier } = useUserIdentifierContext()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();



        const res = await fetch("https://mern-metaverse-krish.vercel.app/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        })

        const resMsg = await res.json();

        if (!res.ok) {
            toast(resMsg.message)
            return
        }

        toast("Login successful! Welcome back!")

        // Destroying cookie if log in exists
        destroyCookie();
        createCookie(resMsg.token, "email/password")
        setUserIdentifier(resMsg.token)

        // Clearing input fields
        setEmail("")
        setPassword("")
    }

    return (
        <div className="flex items-center justify-center py-36 bg-gray-100">

            <ToastContainer />

            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        Sign In
                    </button>

                    <div className='text-center my-2'>
                        <Link to="/forgot-password" className='text-blue-700 underline'> Forgot Password? </Link>
                    </div>

                    <div className='text-center my-2'>
                        Doesn't have an account? <Link to="/signup" className='text-blue-700 underline'> Sign Up </Link>
                    </div>

                    <div className='text-center my-2'>
                        Haven't verified the account yet? <Link to="/verifyAccount" className='text-blue-700 underline'> Click me </Link>
                    </div>

                    <div className="flex items-center justify-center mb-4 mt-3">
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

export default SignIn;
