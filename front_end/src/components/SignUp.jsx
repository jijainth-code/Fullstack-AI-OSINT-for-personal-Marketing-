
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';

const SignUp = () => {
    const clientId = "288180421684-uutcimrp3j2ceb2bmukdm96m3dk9chgi.apps.googleusercontent.com"; // Replace with your actual client ID

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        console.log('logged out')
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Simple validation
        if (!validateEmail(user.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (user.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        setError('');
        sendDataToBackend(user);
    };

    const onSuccess = (response) => {
        console.log('Google Login Success: currentUser:', response.profileObj);
        sendDataToBackend({ ...user, ...response.profileObj });
    };

    const onFailure = (response) => {
        console.log('Google Login Failed: res:', response);
    };

    return (
        <div className="max-w-lg mx-auto bg-gray-200 p-6 rounded-lg flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-400 p-2 rounded-md block w-full"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-400 p-2 rounded-md block w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 w-full">
                    Sign Up
                </button>
            </form>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <div style={{ margin: '20px 0' }}>OR</div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign up with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                responseType='code,token'
            />
            <div style={{ margin: '20px 0' }}>OR</div>  

            <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
            </Link>

            <div style={{ margin: '20px 0' }}>OR</div>  

            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>

        </div>

        
    );
    
    
};

// Function to send data to the backend
const sendDataToBackend = async (data) => {
    const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        console.log('Failed to send data to backend');
    } else {
        console.log('Data sent successfully');
    }
};

export default SignUp;