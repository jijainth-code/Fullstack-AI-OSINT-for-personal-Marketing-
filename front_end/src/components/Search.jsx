import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Link, useNavigate } from 'react-router-dom';



import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  


    import { Input } from "@/components/ui/input";
    import { Label } from '@radix-ui/react-label';
    import { Button } from './ui/button';
    
    import { Textarea } from "@/components/ui/textarea"
    import { Checkbox } from "@/components/ui/checkbox"

    import {
        Select,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectLabel,
        SelectTrigger,
        SelectValue,
      } from "@/components/ui/select"


    import {
        Table,
        TableBody,
        TableCaption,
        TableCell,
        TableFooter,
        TableHead,
        TableHeader,
        TableRow,
      } from "@/components/ui/table"

    import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
    import { Badge } from "@/components/ui/badge"




    
      
    



const Scrapper = () => {
    const [formData, setFormData] = useState({ name: '', companyName: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [links, setLinks] = useState([]);
    const [checkedLinks, setCheckedLinks] = useState({});
    const [isPersonalDataChecked, setIsPersonalDataChecked] = useState(false);
    const [contentType, setContentType] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [searchCompleted, setSearchCompleted] = useState(false);
    const [generatedInfo, setGeneratedInfo] = useState([]);  // State to hold generated data
    const [isCreating, setIsCreating] = useState(true);
    

    const navigate = useNavigate();
    
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

    const handleCheckboxChange = (link) => {
        setCheckedLinks(prevState => ({
            ...prevState,
            [link.post_id]: { // Use post_id as the key
                isChecked: !prevState[link.post_id]?.isChecked, // Toggle checked state
                details: link.detail // Always store the details
            }
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

    const handlePersonalDataConsentChange = (e) => {
        setIsPersonalDataChecked(e.target.checked);
    };

    const handleSelectChange = (e) => {
        setContentType(e.target.value);
    };

    const handleMessageChange = (e) => {
        setUserMessage(e.target.value);
    };

    

    const handleSubmit = async e => {
        e.preventDefault();
    
        // Check if the user is logged in from session storage
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        const userId = sessionStorage.getItem('userId'); // Retrieve the user ID from session storage
    
        if (!isLoggedIn) {
            // If not logged in, redirect to login page
            navigate('/login');
            return;
        }
    
        setErrorMessage('');
        try {
            const response = await fetch('http://localhost:8080/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData, // Pass the formData as a nested object
                    userId // Add userId to the payload separately
                }),
            });
            if (!response.ok) throw new Error('Failed to submit form');
            const result = await response.json();
            setLinks(result.links);
            setSearchCompleted(true); // Enable the generate data button upon successful search
            if (result.requestId) {
                sessionStorage.setItem('requestId', result.requestId);
            }
        } catch (error) {
            setErrorMessage(error.message);
            setSearchCompleted(false); // Disable the generate data button if there's an error
        }
    };
    
    

    const handle_checked_Submit = async () => {
        if (!searchCompleted) return;  // Prevent function execution if it's already running
        setSearchCompleted(false);  // Disable the button when the function starts
    
        const userId = sessionStorage.getItem('userId');
        const requestId = sessionStorage.getItem('requestId');
        const checkedItems = Object.entries(checkedLinks)
            .filter(([_, data]) => data.isChecked)
            .map(([post_id, data]) => ({
                post_id: post_id,
                details: data.details
            }));
    
        try {
            const response = await fetch('http://localhost:8080/submit-checked-links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    links: checkedItems,
                    formData: formData,
                    userId,
                    requestId
                })
            });
            if (!response.ok) throw new Error('Failed to submit checked links');
            const generatedData = await response.json();
            console.log(generatedData);
            setGeneratedInfo(generatedData); // Update state with the received data
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSearchCompleted(true); // Re-enable the button once the function completes or fails
        }
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        if (!isCreating) return;  // Prevent function execution if it's already running
        setIsCreating(false);  // Disable the button when the function starts
    
        // Check if the content type is selected
        if (!userMessage) {
            alert('Please write a message before submitting.');
            setIsCreating(true);  // Re-enable the button if form validation fails
            return;  // Prevent the submission if content type is not selected
        }
        if (!contentType) {
            alert('Please select a content type before submitting.');
            setIsCreating(true);  // Re-enable the button if form validation fails
            return;  // Prevent the submission if content type is not selected
        }

    
        const userId = sessionStorage.getItem('userId');
        const requestId = sessionStorage.getItem('requestId');
        // Form data to be sent to the backend
        const payload = {
            personalDataConsent: isPersonalDataChecked,
            contentType: contentType,
            message: userMessage,
            formData: formData,
            requestId,
            userId
        };
    
        try {
            const response = await fetch('http://localhost:8080/create-submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit data');
            }
    
            const result = await response.json();
            console.log('Success:', result);
            // Handle any additional tasks or state updates based on success
        } catch (error) {
            console.error('Error:', error);
            // Optionally update state to show error to the user
        } finally {
            setIsCreating(true);  // Re-enable the button once the function completes or fails
        }
    };
    
    

    
 
    

    

    return (

        


        <div className="grid gap-4">
            <div className="grid grid-cols-3 gap-[10px]">

                <div className="bg-blue-200  flex flex-col">
                    <Card style={{ height: '35vh', marginBottom: '1rem' }}>
                    


                    
                    <CardHeader>
                        <CardTitle>Create Search</CardTitle>
                        <CardDescription>deploy</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 flex-grow">
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="eg. John Frey" /> 
                            </div>
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Keywords</Label>
                            <Input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Optional" />
                            </div>
                            <CardFooter className="flex justify-center">
                            <Button type="submit" >Search</Button>
                            </CardFooter>
                        </div>
                        </form>
                    </CardContent>
                    

                    </Card>

                    <Card style={{ height: '55vh', marginBottom: '1rem'}}>

                    <Card style={{ height: '90%', marginBottom: '1rem' , overflowY: 'auto'}}>
                    {/* Linkssss */}

                    {links.map((link, index) => (
                        <div key={index} className="items-top flex p-4 space-x-2">
                            <input
                                type="checkbox"
                                id={`custom-checkbox-${index}`}
                                checked={!!checkedLinks[link.post_id]?.isChecked}
                                onChange={() => handleCheckboxChange(link)} // Pass the entire link object
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label htmlFor={`custom-checkbox-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    <a href={link.post_id} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                                        {link.post_id}
                                    </a>
                                </label>
                                <p className="text-sm text-muted-foreground">
                                    {link.detail || "No additional information available."}
                                </p>
                            </div>
                        </div>
                    ))}

                    
                    </Card>

                    <Card style={{ height: '10%', marginBottom: '1rem' }}>
                    <div className="grid w-full  gap-2 flex-shrink-0 ">
                    <Button onClick={handle_checked_Submit} disabled={!searchCompleted}>Generate Data</Button>
                    </div>

                    </Card>

                    </Card>

                </div>

                <div className="bg-red-200 flex flex-col">
                    
                    <Card style={{ height: '60vh', marginBottom: '1rem' , overflowY: 'auto'}}>
                    {/* generated info */}

                    <p className="m-6 p-2 text-xs overflow-auto max-h-full w-full whitespace-pre-wrap">
                        {generatedInfo}
                    </p>
                    
                    </Card>

                    <Card style={{ height: '30vh', marginBottom: '1rem' }}>

            <Card style={{ height: '30%' }}>
            <div className="items-top flex space-x-2">
                <input
                    id="terms1"
                    type="checkbox"
                    checked={isPersonalDataChecked}
                    onChange={handlePersonalDataConsentChange}
                    className="mt-1 align-top bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-4 w-4 text-blue-600 border rounded"
                />
                <div className="grid gap-1.5 leading-none">
                    <label htmlFor="terms1" className="text-sm font-medium leading-none cursor-pointer">
                        Use Personal Data
                    </label>
                    <p className="text-sm text-muted-foreground">
                        You agree to Feed the model with personal data.
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="contentType" className="block text-sm font-medium text-gray-700">Content Type</label>
                <select
                    id="contentType"
                    value={contentType}
                    onChange={handleSelectChange}
                    className="mt-1 block w-[180px] pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    required
                >
                    <option value="">Select content type</option>
                    <option value="message">Message</option>
                    <option value="email">Email</option>
                </select>
            </div>
            </Card>

            <Card style={{ height: '30vh', marginBottom: '1rem' }}>
                <div className="grid w-full h-full gap-2">
                    <textarea placeholder="Type your message here." value={userMessage} onChange={handleMessageChange} className="textarea"/>
                    <Button onClick={handleCreateSubmit} disabled={!isCreating || !generatedInfo || generatedInfo.length === 0}>Create</Button>
                </div>
            </Card>
        </Card>


                                    
                </div>

                <div className="bg-green-200 flex flex-col">
                    
                    <Card style={{ height: '95vh' , overflowY: 'auto' }}>
                    
                    {messages.map((message, index) => (


                        <Alert>
                        <AlertTitle>{message.time}:</AlertTitle>
                        <Badge>Beta</Badge>
                        <AlertDescription>
                        {message.text}
                        </AlertDescription>
                        </Alert>   

                    )

                    )}

                    


                    </Card>

                    
                </div>
            </div>

            
        </div>





        







        
    );
};

export default Scrapper;


{/* <button onClick={handleCheckAll} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out shadow">
            Check All
        </button>
        <button onClick={handleClearAll} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out shadow">
            Clear All
        </button> */}

        {/* <form onSubmit={handleSubmit} className="flex flex-col space-y-4 flex-grow">
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
        </form> */}

        {/* {links.map((link, index) => (
            <div key={index} class="flex items-center p-4 bg-gray-900 rounded-xl shadow-md hover:shadow-lg">
                <fieldset class="flex items-center space-x-3">
                    <input type="checkbox" id={`custom-checkbox-${index}`} checked={!!checkedLinks[link]} onChange={() => handleCheckboxChange(link)} class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" />
                    <label htmlFor={`custom-checkbox-${index}`} class="text-sm font-medium text-white">
                        <a href={link} target="_blank" rel="noopener noreferrer" class="hover:text-blue-400">{link}</a>
                    </label>
                </fieldset>
            </div>
        ))} */}

        {/* <div className="w-1/3 bg-gray-900 p-4 shadow rounded-lg overflow-auto">
            {messages.map((message, index) => (
                <div key={index} className="text-white p-2">
                    <span>{message.time}:</span>
                    <span className="ml-2">{message.text}</span>
                </div>
            ))}
        </div> */}
