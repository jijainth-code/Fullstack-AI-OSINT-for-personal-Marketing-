import 'tailwindcss/tailwind.css';
import React from 'react';

const Download = () => {
    const handleDownload = async () => {


        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            alert('You must be logged in to download this image.');
            return;
        }

        
        const response = await fetch('http://localhost:8080/download-image');
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'img.png');  // The filename for download
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    };

    return (
        <div className="text-center mt-20">
            <button onClick={handleDownload} className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">
                Download Image
            </button>
        </div>
    );
};

export default Download;