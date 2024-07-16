import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";



const OAuthLogin = ({ clientId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    console.log(decoded);
  };

  const onError = (errorResponse) => {
    setError(errorResponse);
    console.error('Login Failed:', errorResponse);
  };

  const logOut = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="justify-center flex h-14 ml-0">
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default OAuthLogin;