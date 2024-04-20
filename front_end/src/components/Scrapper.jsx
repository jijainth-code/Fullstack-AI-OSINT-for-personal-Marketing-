import 'tailwindcss/tailwind.css';


import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Scrapper = () => {
    const [formData, setFormData] = useState({ name: '', companyName: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socket = io('http://localhost:8080');

    useEffect(() => {
        // Listen for messages
        socket.on('message', (message) => {
            // Update messages state
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    time: new Date().toLocaleTimeString(),
                    text: message.text
                }
            ]);
        });

        // Cleanup the effect
        return () => socket.off('message');
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Confirm submission
        const confirmed = window.confirm("Are you sure you want to submit?");
        if (!confirmed) return;

        setErrorMessage(''); // Clear previous errors

        // Send data to backend
        const response = await fetch('http://localhost:8080/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            setErrorMessage(errorText || 'Error submitting form');
        } else {

            const resultText = await response.text();
            const newMessage = {
                time: new Date().toLocaleTimeString(),
                text: resultText
            };
              // Append new message with timestamp
        }
    };

    const handleClear = () => {
        setFormData({ name: '', companyName: '' }); // Clear form data
        setErrorMessage(''); // Clear error message
        setMessages([]); // Clear messages
    };

    return (
        <div className="flex h-full">
            {/* Form Section */}
            <div className="w-1/2 flex flex-col items-center justify-center p-4">
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    {/* Name Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name of the person
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    {/* Company Name Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            id="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    {/* Error Message */}
                    <div className="mb-4">
                        {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
                    </div>
                    {/* Submit Button */}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit
                    </button>
                </form>
                {/* Clear Button */}
                <button onClick={handleClear} className="mt-4 bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Clear
                </button>
            </div>

            {/* Output Section */}
            <div className="w-1/2 flex items-center justify-center p-4 bg-gray-200">
                <div className="w-full h-full p-4 bg-gray-100 border-2 border-gray-300 rounded overflow-auto">
                {messages.map((message, index) => (
                        <p key={index}>
                            <span style={{ color: 'black' }}>{message.time}</span>:
                            <span style={{ color: 'blue' }}>{message.text}</span>
                        </p>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Scrapper;
