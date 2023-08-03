import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserVerificationPage = () => {

    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");

    const [userFound, setUserFound] = useState(false)
    const [verificationCompleted, setVerificationCompleted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verify the user email and send verification code to change the password
        if (!userFound) {

            const res = await fetch("https://mern-metaverse-krish.vercel.app/api/verify-email-request", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email }),
            })

            const resMsg = await res.json();

            toast(resMsg.message)

            if (res.ok) setUserFound(true)

            return;
        }

        const res = await fetch("https://mern-metaverse-krish.vercel.app/api/verify-email", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, verificationCode }),
        })

        const resMsg = await res.json();

        toast(resMsg.message)

        if (res.ok) {
            // Clearing input fields
            setEmail("")
            setVerificationCode("")
            setUserFound(false)
            setVerificationCompleted(true)
            return
        }

    }

    return (
        <div className="flex items-center justify-center py-36 bg-gray-100">

            <ToastContainer />

            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">

                {!verificationCompleted && <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Verify Email </h2>
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


                        {
                            userFound && (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
                                            Verification Code
                                        </label>
                                        <input
                                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="verificationCode"
                                            type="text"
                                            placeholder="Enter your Verification Code"
                                            value={verificationCode}
                                            name='verificationCode'
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                            required
                                        />
                                    </div>

                                </>
                            )
                        }

                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                        >
                            {
                                userFound ? "Change Password" : "Get Verification Code"
                            }
                        </button>

                    </form>
                </>}

                <div className='text-center my-4'>
                    <Link to="/signin" className='text-blue-700 underline'> Sign In again </Link>
                </div>
            </div>
        </div >
    );
};

export default UserVerificationPage;
