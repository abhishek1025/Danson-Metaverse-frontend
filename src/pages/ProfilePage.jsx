import React, { useEffect, useState } from 'react';
import { getCookies } from '../utils/cookies.utils';
import { Link } from 'react-router-dom';


const ProfilePage = () => {

    const [userInfo, setUserInfo] = useState(null);

    const { userIdentifier, serviceProvider } = getCookies();

    useEffect(() => {

        const getUserData = async () => {

            // For email and password
            if (userIdentifier && serviceProvider === "email/password") {

                const { username, email } = getCookies()

                setUserInfo(JSON.stringify({
                    "username": username,
                    "email": email
                }, null, 2));

                return;
            }


            // For google
            if (userIdentifier && serviceProvider === "google") {
                const res = await fetch(`http://localhost:3000/api/userGoogleProfile/${userIdentifier}`, {
                    method: "GET"
                })

                const userData = await res.json()
                setUserInfo(JSON.stringify(userData, null, 4))
                return;
            }


            // For facebook
            const res = await fetch(`http://localhost:3000/api/userFacebookProfile/${userIdentifier}`, {
                method: "GET"
            })

            const userData = await res.json()
            setUserInfo(JSON.stringify(userData, null, 4))
        }
        getUserData()
    }, [serviceProvider, userIdentifier])

    return (
        <div className="bg-gray-200  py-36 h-[85.4vh]">

            {/* Navigation Links */}
            <div className="mt-4 text-center mb-10">

                {/* Link to Reset Password Page */}
                <Link to="/reset-password" className="text-blue-600 hover:text-blue-800">
                    Reset Password
                </Link>
            </div>

            <div>
                {
                    userInfo && (
                        <pre className="json-display">
                            {userInfo}
                        </pre>
                    )
                }
            </div>



        </div>
    );
};

export default ProfilePage;
