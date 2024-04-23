import React, { useState } from 'react';

import 'tailwindcss/tailwind.css';


const Hero = () => {
    // Sample data for the line chart
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sample Data',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    // Sample emails for the email UI
    const emails = [
        'email1@example.com',
        'email2@example.com',
        'email3@example.com',
        'email4@example.com',
        'email5@example.com'
    ];

    // State for the personal note
    const [note, setNote] = useState('');

    return (
        <main className="p-6">
            <div className=" max-w-7xl mx-auto">
                {/* Graph UI */}
                

                {/* Email and Personal Note UI */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email UI */}
                    <div className="bg-white overflow-auto p-4 rounded-lg shadow h-96 ">
                        <ul>
                            {emails.map((email, index) => (
                                <li key={index} className="border-b last:border-b-0 p-2 flex justify-center">
                                <button className="text-blue-500 hover:shadow-lg flex items-center justify-center" onClick={() => console.log(email)}>
                                    {email}
                                </button>
                                </li>
                            ))}
                        </ul>
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




// // src/components/Hero.jsx
// import React from 'react';
// import 'tailwindcss/tailwind.css';


// const Hero = () => {
//     return (
//         <main className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
//             <div className="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2">
//                 <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
//                     <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white">Explore Our Digital Solutions</h1>
//                     <p className="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">Innovative & Reliable</p>
//                 </div>
//                 <div className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
//                     <img src="https://images.pexels.com/photos/21378525/pexels-photo-21378525/free-photo-of-a-beach-with-a-green-hill-and-blue-water.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Main visual" className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" loading="lazy"/>
//                     <img src="https://images.pexels.com/photos/21429902/pexels-photo-21429902/free-photo-of-alula-saudi-arabia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Interior view" className="hidden w-full h-52 object-cover rounded-lg sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy"/>
//                     <img src="https://images.pexels.com/photos/17180779/pexels-photo-17180779/free-photo-of-forest-in-mountains-reflecting-in-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Another interior view" className="hidden w-full h-52 object-cover rounded-lg md:block lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy"/>
//                 </div>
//                 <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
//                     <dt className="sr-only">Reviews</dt>
//                     <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
//                         <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-1 stroke-current dark:stroke-indigo-500">
//                             <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
//                         </svg>
//                         <span>4.89 <span className="text-slate-400 font-normal">(128 reviews)</span></span>
//                     </dd>
//                     <dt className="sr-only">Location</dt>
//                     <dd className="flex items-center">
//                         <svg width="2" height="2" aria-hidden="true" fill="currentColor" className="mx-3 text-slate-300">
//                             <circle cx="1" cy="1" r="1" />
//                         </svg>
//                         <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mr-1 text-slate-400 dark:text-slate-500" aria-hidden="true">
//                             <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
//                             <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
//                         </svg>
//                         Your Location Here
//                     </dd>
//                 </dl>
//                 <div className="mt-4 col-start-1 row-start-3 self-center sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2 lg:mt-6 lg:col-start-1 lg:row-start-3 lg:row-end-4">
//                     <button type="button" className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg">Check availability</button>
//                 </div>
//                 <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
//                     Description or additional details about the digital solutions offered by your company.
//                 </p>
//             </div>
//         </main>
//     );
// };

// export default Hero;

