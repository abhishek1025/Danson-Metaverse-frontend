import React, { useEffect } from 'react'
import { createCookie } from '../utils/cookies.utils';
import { useUserIdentifierContext } from '../Hooks/useUserIdentifierContext';

const SignInWithGoogleBtn = ({ CLIENT_ID }) => {


    const { setUserIdentifier } = useUserIdentifierContext();


    const storeUserDataInDB = async (token) => {

        const res = await fetch("http://localhost:3000/api/registerUsingGoogle", {
            method: "POST",
            headers: {
                "authorization": `Bearer ${token}`,
            }
        })
        const { userEmail } = await res.json()
        return userEmail;
    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        // Function to handle the credential response
        const handleGoogleCredentialResponse = async (response) => {

            const userEmail = await storeUserDataInDB(response.credential)

            if (userEmail) {
                createCookie(userEmail, "google")
                setUserIdentifier(userEmail)
            }

        };

        // Add event listener to handle the response when the page loads
        window.handleGoogleCredentialResponse = handleGoogleCredentialResponse;

        // Clean up the event listener when the component unmounts
        return () => {
            delete window.handleGoogleCredentialResponse;
        };
    }, [setUserIdentifier]);



    return (
        <>
            <div id="g_id_onload"
                data-client_id={CLIENT_ID}
                data-callback="handleGoogleCredentialResponse"
                data-auto_prompt="false"
            >
            </div>
            <div className="g_id_signin"
                data-type="standard"
                data-size="medium"
                data-theme="outline"
                data-text="sign_in_with"
                data-shape="rectangular"
                data-logo_alignment="left"
            >
            </div>
        </>
    )
}

export default SignInWithGoogleBtn