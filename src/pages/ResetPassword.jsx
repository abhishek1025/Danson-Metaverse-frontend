import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookies } from '../utils/cookies.utils';

const ForgetPassword = () => {


    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (newPassword !== confirmNewPassword) return toast("New Passwords do not match")

        const { userIdentifier } = getCookies()

        const res = await fetch("https://mern-metaverse-krish.vercel.app/api/password-reset", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `token ${userIdentifier}`
            },
            body: JSON.stringify({ email, oldPassword, newPassword }),
        })

        const resMsg = await res.json();

        toast(resMsg.message)

        if (res.ok) {
            // Clearing input fields
            setEmail("")
            setNewPassword("")
            setOldPassword("")
            setConfirmNewPassword("")
            return
        }

    }

    return (
        <div className="flex items-center justify-center py-36 bg-gray-100">

            <ToastContainer />

            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Reset Password</h2>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
                            Old Password
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="oldPassword"
                            type="password"
                            placeholder="Enter your password"
                            value={oldPassword}
                            name='oldPassword'
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                            New Password
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="newPassword"
                            type="password"
                            placeholder="Enter your password"
                            value={newPassword}
                            name='newPassword'
                            onChange={(e) => setNewPassword(e.target.value)}
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
                        Reset Password
                    </button>

                    {/* <div className='text-center my-4'>
                        <Link to="/forgot-password" className='text-blue-700 underline'> Forgot Password? </Link>
                    </div>

                    <div className='text-center my-4'>
                        Got your new Password? <Link to="/signin" className='text-blue-700 underline'> Sign in  </Link>
                    </div>
 */}

                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
