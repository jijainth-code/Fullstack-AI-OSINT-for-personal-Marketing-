import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Scrapper = () => {
    const [formData, setFormData] = useState({ name: '', companyName: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [links, setLinks] = useState([]);
    const [checkedLinks, setCheckedLinks] = useState({});
    const socket = io('http://localhost:8080');

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(prevMessages => [...prevMessages, {
                time: new Date().toLocaleTimeString(),
                text: message.text
            }]);
        });

        return () => socket.off('message');
    }, []);

    const handleCheckboxChange = link => {
        setCheckedLinks(prev => ({
            ...prev,
            [link]: !prev[link]
        }));
    };

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

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const response = await fetch('http://localhost:8080/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Failed to submit form');
            const result = await response.json();
            setLinks(result.links);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left Section */}
            <div className="w-1/3 flex flex-col">
            <div className="h-1/5 bg-gray-800 p-4 shadow-lg rounded-lg flex flex-col">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 flex-grow">
                    <div>
                        <label htmlFor="name" className="text-white font-semibold">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="companyName" className="text-white font-semibold">Company Name</label>
                        <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                    </div>
                    <div className="mt-auto">
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out shadow">
                            Submit
                        </button>
                        {errorMessage && <p className="mt-2 text-red-500 text-sm">{errorMessage}</p>}
                    </div>
                </form>
            </div>

            <div class="flex flex-col min-2/5 bg-gray-800 p-4 shadow-lg rounded-lg overflow-hidden">
    <div class="overflow-y-auto max-w-[100%]" style={{ height: '80vh' }}> {/* Set height to 80% of the viewport height */}
        <div class="space-y-4">
            <div class="flex flex-col space-y-4">
                {links.map((link, index) => (
                    <div key={index} class="flex items-center p-4 bg-gray-900 rounded-xl shadow-md hover:shadow-lg">
                        <fieldset class="flex items-center space-x-3">
                            <input type="checkbox" id={`custom-checkbox-${index}`} checked={!!checkedLinks[link]} onChange={() => handleCheckboxChange(link)} class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" />
                            <label htmlFor={`custom-checkbox-${index}`} class="text-sm font-medium text-white">
                                <a href={link} target="_blank" rel="noopener noreferrer" class="hover:text-blue-400">{link}</a>
                            </label>
                        </fieldset>
                    </div>
                ))}
            </div>
        </div>
    </div>
    <div class="flex justify-between">
        <button onClick={handleCheckAll} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out shadow">
            Check All
        </button>
        <button onClick={handleClearAll} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out shadow">
            Clear All
        </button>
    </div>
</div>










            
        </div>
            {/* Middle Section */}
            <div className="w-1/3 flex flex-col p-4">
                <div className="basis-2/3 bg-gray-800 p-4 shadow rounded-lg overflow-auto">
                    <ul>
                        {Array.from({ length: 20 }).map((_, index) => (
                            <li key={index} className="text-white py-1">Bullet Point {index + 1}</li>
                        ))}
                    </ul>
                </div>
                <div className="basis-1/6 bg-gray-700 p-4 shadow rounded-lg">
                    <select className="w-full p-2 rounded text-gray-700 mb-2">
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </select>
                    <div>
                        <div className="relative flex items-start py-4 ml-2">
                            <input id="checkbox1" type="checkbox" className="hidden peer" name="checkbox_option" value="1" />
                            <label htmlFor="checkbox1" className="inline-flex items-center justify-between w-full p-2 font-medium tracking-tight border rounded-lg cursor-pointer bg-gray-100 text-gray-800 border-gray-500 peer-checked:border-teal-400 peer-checked:bg-teal-700 peer-checked:text-white peer-checked:font-semibold">
                                <div className="text-sm">Check 1</div>
                            </label>
                        </div>
                        <div className="relative flex items-start py-4 ml-2">
                            <input id="checkbox2" type="checkbox" className="hidden peer" name="checkbox_option" value="2" />
                            <label htmlFor="checkbox2" className="inline-flex items-center justify-between w-full p-2 font-medium tracking-tight border rounded-lg cursor-pointer bg-gray-100 text-gray-800 border-gray-500 peer-checked:border-teal-400 peer-checked:bg-teal-700 peer-checked:text-white peer-checked:font-semibold">
                                <div className="text-sm">Check 2</div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="basis-1/6 bg-gray-800 p-4 shadow rounded-lg">
                    <textarea className="w-full p-2 rounded text-gray-700 mb-2" placeholder="Type something..."></textarea>
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Submit</button>
                </div>
            </div>
            {/* Right Section */}
            <div className="w-1/3 bg-gray-900 p-4 shadow rounded-lg overflow-auto">
                {messages.map((message, index) => (
                    <div key={index} className="text-white p-2">
                        <span>{message.time}:</span>
                        <span className="ml-2">{message.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Scrapper;
