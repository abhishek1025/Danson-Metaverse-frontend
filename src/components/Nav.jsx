import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserIdentifierContext } from '../Hooks/useUserIdentifierContext'
import { destroyCookie } from '../utils/cookies.utils';


const Nav = () => {

    const { setUserIdentifier, userIdentifier } = useUserIdentifierContext()

    const logout = () => {
        setUserIdentifier(null)
        destroyCookie();
    }

    return (
        <nav className="bg-white py-4 px-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <span className="text-2xl font-bold">Random Project</span>
                <ul className="space-x-4">
                    <li className="inline-block">
                        <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                    </li>
                    <li className="inline-block">
                        <Link to={`${userIdentifier ? 'profile' : 'signin'}`} className="text-gray-700 hover:text-gray-900">Profile</Link>
                    </li>
                    <li className="inline-block">
                        {
                            userIdentifier && (<Link to="/signin" onClick={logout} className="text-gray-700 hover:text-gray-900">Logout</Link>)
                        }

                        {
                            !userIdentifier && (<Link to="signin" className="text-gray-700 hover:text-gray-900">Signin</Link>)
                        }

                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav