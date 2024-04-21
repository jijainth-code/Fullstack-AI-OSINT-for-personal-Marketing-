import 'tailwindcss/tailwind.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Scrapper = () => {
    const [formData, setFormData] = useState({ name: '', companyName: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [links, setLinks] = useState([]);  // State to store links from the form submission
    const [checkedLinks, setCheckedLinks] = useState({}); // State to track checked links
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

    const handleCheckAll = () => {
        const newCheckedLinks = {};
        links.forEach(link => {
            newCheckedLinks[link] = true;
        });
        setCheckedLinks(newCheckedLinks);
    };

    const handleClearAll = () => {
        setCheckedLinks({});
    };

    const handleCheckboxChange = (link) => {
        setCheckedLinks(prev => ({
            ...prev,
            [link]: !prev[link]
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to submit?")) return;
        setErrorMessage(''); // Clear previous errors
    
        try {
            const response = await fetch('http://localhost:8080/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error('Error submitting form');
            }
    
            const result = await response.json(); // Parse the JSON response
            if (result.links) {
                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        time: new Date().toLocaleTimeString(),
                        text: 'link recieved'
                    }
                ]);
                console.log('Links received:', result.links);  // Log the links to the console
                setLinks(result.links);  // Handle links from the response
            } else {
                throw new Error('No links received');
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleSubmitCheckedLinks = async () => {
        const selectedLinks = Object.entries(checkedLinks)
            .filter(([link, isChecked]) => isChecked)
            .map(([link]) => link);

        // Check if selectedLinks array is not empty
        if (selectedLinks.length > 0) {
            // Post selected links to the backend
            try {
                const response = await fetch('http://localhost:8080//submit-checked-links', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ links: selectedLinks })
                });

                if (!response.ok) {
                    throw new Error('Failed to submit checked links');
                }
                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        time: new Date().toLocaleTimeString(),
                        text: 'Checked links submitted successfully'
                    }
                ]);
                // Handle response data here
                console.log('Checked links submitted successfully');
            } catch (error) {
                console.error('Error submitting checked links:', error);
            }
        } else {
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    time: new Date().toLocaleTimeString(),
                    text: 'No links selected'
                }
            ]);
            console.log('No links selected');
        }
        };
    

    const handleClear = () => {
        setFormData({ name: '', companyName: '' }); // Clear form data
        setErrorMessage(''); // Clear error message
        setMessages([]); // Clear messages
        setLinks([]) // Clear links
    };

    return (
        <div className="flex h-full">
            {/* Left Section divided into three parts */}
            <div className="w-1/2 flex flex-col p-4">
                {/* Top Section */}
                <div className="flex-grow-0 flex-shrink-0 basis-1/3">
                    <form onSubmit={handleSubmit} className="w-full max-w-md">
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
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                                Key Words
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
                        {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                        <button onClick={handleClear} className="mt-4 bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Clear
                        </button>
                    </form>
                </div>
                {/* Middle Section */}
                <div className="flex-grow-0 flex-shrink-0 basis-1/3 bg-white shadow-md rounded-lg p-4">
                    <ul className="list-none space-y-2">
                        {links.map((link, index) => (
                            <li key={index} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`link-${index}`}
                                    checked={!!checkedLinks[link]}
                                    onChange={() => handleCheckboxChange(link)}
                                    className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                                />
                                <a href={link} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0 text-blue-600 hover:text-blue-800 visited:text-purple-600">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-4">
                        <button onClick={handleCheckAll} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline">
                            Check All
                        </button>
                        <button onClick={handleClearAll} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline">
                            Clear All
                        </button>
                    </div>
                    <button onClick={handleSubmitCheckedLinks} className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit Checked Links
                    </button>
                </div>

                {/* Bottom Section */}
                <div className="flex-grow-0 flex-shrink-0 basis-1/3">
                    {/* Additional content or functionality can go here */}
                </div>
            </div>

            {/* Right Output Section */}
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
