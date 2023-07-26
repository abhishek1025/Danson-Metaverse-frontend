import React, { useEffect } from 'react'
import { createCookie } from '../utils/cookies.utils';
import { useTokenContext, useUserIdentifierContext } from '../Hooks/useUserIdentifierContext';

const SignInWithFacebookBtn = () => {

    const { setUserIdentifier } = useUserIdentifierContext();


    const storeUserDataInDB = async (token) => {

        const facebookResponse = await fetch(`https://graph.facebook.com/v17.0/me?fields=id, first_name, last_name, middle_name, name, name_format, picture, short_name&transport=cors&access_token=${token}`)

        const { id, name, picture } = await facebookResponse.json()


        const userData = { profileID: id, name, picture: picture.data.url }

        const res = await fetch("http://localhost:3000/api/registerUsingFacebook", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "serviceprovider": "facebook",
            },
            body: JSON.stringify(userData)
        })

        const { profileID } = await res.json()


        return profileID;
    }



    useEffect(() => {
        const script = document.createElement('script');
        script.src = process.env.REACT_APP_FB_APP_URL;
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous"
        script.nonce = "rYyHFfpr"
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        // Function to handle the credential response
        const handleFacebookCredentialResponse = async (response) => {
            if (response.authResponse) {
                const { accessToken } = response.authResponse
                const profileID = await storeUserDataInDB(accessToken)
                if (profileID) {
                    createCookie(profileID, "facebook")
                    setUserIdentifier(profileID)
                }
            }
        };

        // Add event listener to handle the response when the page loads
        window.handleFacebookCredentialResponse = handleFacebookCredentialResponse;

        // Clean up the event listener when the component unmounts
        return () => {
            delete window.handleFacebookCredentialResponse;
        };
    }, []);

    return (
        <>
            <div id="fb-root"></div>
            <div className="fb-login-button"
                data-size="medium"
                data-auto-logout-link="false"
                data-use-continue-as="false"
                data-onlogin="handleFacebookCredentialResponse"
            >
            </div>
        </>
    )
}

export default SignInWithFacebookBtn