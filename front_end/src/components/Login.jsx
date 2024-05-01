import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Login = () => {
  const clientId = '835639440502-m789npsra074rus53mhqb0atjvj3tqkb.apps.googleusercontent.com';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initGoogleSignIn = () => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse
      });
      window.google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        { theme: 'outline', size: 'large' }
      );
      window.google.accounts.id.prompt(); // Display the One Tap prompt
    };

    window.onGoogleLibraryLoad = () => {
      window.gapi.load('auth2', () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init({
            client_id: clientId,
          });
        }
      });
    };

    initGoogleSignIn();
  }, []);

  useEffect(() => {
    // Check if the user is logged in from session storage
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleCredentialResponse = async (response) => {
    const decodedToken = jwtDecode(response.credential);
    console.log('Decoded JWT:', decodedToken);
  
    // Send token to backend for verification
    try {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: decodedToken.email,
          googleId: decodedToken.sub,
          name: decodedToken.given_name,
          picture: decodedToken.picture
        })
      });
  
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setIsLoggedIn(true);
        // Store login state in session storage
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userId', decodedToken.sub);
        navigate(`/history?id=${decodedToken.sub}`);
      }
    } catch (error) {
      console.error('Error during login process:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userId');
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="flex justify-center items-center text-2xl">{isLoggedIn ? "Logout" : "Sign In"}</CardTitle>
          <CardDescription className="flex justify-center items-center">
            {isLoggedIn ? "You are logged in." : "Enter your email below to sign in to your account using Google Sign-In"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
        {!isLoggedIn && (
            <div className="grid gap-4">
            <div id="buttonDiv"></div>
            
            </div>
        )}
        {isLoggedIn && (
            <Button onClick={handleLogout} className="w-full">Logout</Button>
        )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
