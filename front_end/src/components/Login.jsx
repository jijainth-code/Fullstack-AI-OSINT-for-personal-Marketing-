// src/components/Login.jsx
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const [loginResponse, setLoginResponse] = useState({ success: false });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
    
        const data = await response.json();
        setLoginResponse(data); // Store the response data in state
        if (data.success) {
            setMessage('User is logged in.');
            localStorage.setItem('isLoggedIn', 'true'); // Set login status
        } else {
            setMessage('Login failed. Check your email and password.');
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-gray-200 p-6 rounded-lg flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
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
                        value={credentials.password}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-400 p-2 rounded-md block w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 w-full">
                    Login
                </button>
            </form>
            {message && <div className={`text-${loginResponse.success ? 'green' : 'red'}-500 mt-2`}>{message}</div>}
        </div>
    );
};

export default Login;
