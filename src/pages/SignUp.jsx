import React, { useState } from 'react';
import SignInWithFacebookBtn from '../components/SignInWithFacebookBtn';
import SignInWithGoogleBtn from '../components/SignInWithGoogleBtn';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const CLIENT_ID = "90952135970-jt1ghjsrlql93ncfhfgmlpdatp4k16dj.apps.googleusercontent.com"

    const userInfo = {
        username: "", email: "", password: ""
    }

    const [signupFormFields, setSignupFormFields] = useState(userInfo);
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const handleChange = (e) => setSignupFormFields({ ...signupFormFields, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (signupFormFields.password !== confirmNewPassword) return toast("Passwords don't match. Please check it :)")

        const res = await fetch("https://mern-metaverse-krish.vercel.app/api/register-request", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupFormFields),
        })

        const resMsg = await res.json();

        toast(resMsg.message)

        setSignupFormFields(userInfo);
        setConfirmNewPassword("")
    }


    return (
        <div className="flex items-center justify-center py-20 bg-gray-100">

            <ToastContainer />

            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={signupFormFields.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            onChange={handleChange}
                            value={signupFormFields.email}
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
                            name="password"
                            onChange={handleChange}
                            value={signupFormFields.password}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
                            Confirm New Password
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmNewPassword"
                            type="password"
                            placeholder="Enter your password"
                            value={confirmNewPassword}
                            name='confirmNewPassword'
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        Sign Up
                    </button>

                    <div className='text-center my-4'>
                        Already have an account ? <Link to="/signin" className='text-blue-700 underline'> Sign In </Link>
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

export default SignUp;
