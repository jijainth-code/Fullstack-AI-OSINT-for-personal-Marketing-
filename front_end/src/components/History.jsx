import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const userId = sessionStorage.getItem('userId');
    const navigate = useNavigate();
    const [note, setNote] = useState('');

    useEffect(() => {
        if (!userId) {
            // ID not found in session storage, handle error
            setError('Please log in to view the data.');
            setLoading(false);
            return;
        }

        fetch(`http://localhost:8080/get-results?id=${userId}`) // Use the retrieved ID in the URL
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch data:', error);
                setError('Failed to load data');
                setLoading(false);
            });
    }, [userId]);

    const handleSearchClick = (userId) => {
        navigate(`/search?id=${userId}`); // Navigating and passing a parameter in the URL
    }

    if (error) return <div>Error: {error}</div>;
    if (!userId) return <div>Please log in to view the data.</div>; // Render login prompt if userId is not provided

    return (
        <main className="p-6">
            <div className=" max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                    <div>
                        {Array.isArray(data) && data.map((item, index) => (
                            <div key={index}>
                                <li key={index} className="border-b last:border-b-0 p-2 flex justify-center">
                                    <button className="text-blue-500 hover:shadow-lg flex items-center justify-center" onClick={() => handleSearchClick(item.meta.requestid)}>
                                        Search Keys: {item.user_search_key.name}
                                    </button>
                                    <h3>Status: {item.meta.status}</h3>
                                </li>
                            </div>
                        ))}
                    </div>
                    {/* Personal Note UI */}
                    <div className="bg-white p-4 rounded-lg shadow h-96">
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full h-full p-2 resize-none border rounded"
                            placeholder="Write your personal note here..."
                        ></textarea>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Hero;