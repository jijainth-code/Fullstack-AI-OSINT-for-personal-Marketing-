import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';



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
    const socket = io('http://localhost:8080');

    const invoices = [
        {
          invoice: "INV001",
          paymentStatus: "Paid",
          totalAmount: "$250.00",
          paymentMethod: "Credit Card",
        },
        {
          invoice: "INV002",
          paymentStatus: "Pending",
          totalAmount: "$150.00",
          paymentMethod: "PayPal",
        },
        {
          invoice: "INV003",
          paymentStatus: "Unpaid",
          totalAmount: "$350.00",
          paymentMethod: "Bank Transfer",
        },
        {
          invoice: "INV004",
          paymentStatus: "Paid",
          totalAmount: "$450.00",
          paymentMethod: "Credit Card",
        },
        {
          invoice: "INV005",
          paymentStatus: "Paid",
          totalAmount: "$550.00",
          paymentMethod: "PayPal",
        },
        {
          invoice: "INV006",
          paymentStatus: "Pending",
          totalAmount: "$200.00",
          paymentMethod: "Bank Transfer",
        },
        {
          invoice: "INV007",
          paymentStatus: "Unpaid",
          totalAmount: "$300.00",
          paymentMethod: "Credit Card",
        },
      ]


    const frameworks = [
        {
          value: "next.js",
          label: "Next.js",
        },
        {
          value: "sveltekit",
          label: "SvelteKit",
        },
        {
          value: "nuxt.js",
          label: "Nuxt.js",
        },
        {
          value: "remix",
          label: "Remix",
        },
        {
          value: "astro",
          label: "Astro",
        },
      ]

    


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
          [link]: !prevState[link] // Toggle the checkbox state
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

    const handleCreateClick = () => {
        console.log("Checkbox Value (Use Personal Data):", isPersonalDataChecked);
        console.log("Selected Content Type:", contentType);
        console.log("Message:", userMessage);
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

    const handle_checked_Submit = async () => {
        const checkedItems = Object.entries(checkedLinks)
                                  .filter(([_, isChecked]) => isChecked)
                                  .map(([link]) => link);

        try {
            const response = await fetch('http://localhost:8080/submit-checked-links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ links: checkedItems }),
            });
            if (!response.ok) throw new Error('Failed to submit checked links');
            const result = await response.json();
            console.log(result); // Handle success
        } catch (error) {
            console.error('Error:', error);
        }
    };


    
 
    
    const array = [1, 2, 3, 4, 5];
    

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
                        <input type="checkbox" id={`custom-checkbox-${index}`} checked={!!checkedLinks[link.post_id]} onChange={() => handleCheckboxChange(link.post_id)} />
                        <div className="grid gap-1.5 leading-none">
                            <label
                            htmlFor={`custom-checkbox-${index}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            <a href={link.post_id} target="_blank" rel="noopener noreferrer" class="hover:text-blue-400"><Button variant="link">{link.post_id}</Button></a> 
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
                    <Button onClick={handle_checked_Submit}>Generate Data</Button>
                    </div>

                    </Card>

                    </Card>

                </div>

                <div className="bg-red-200 flex flex-col">
                    
                    <Card style={{ height: '60vh', marginBottom: '1rem' }}>
                    {/* generated info */}

                    

                        <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                            </TableRow>
                        </TableFooter>
                        </Table>

                    

                    

                    </Card>

                    <Card style={{ height: '30vh', marginBottom: '1rem' }}>
            <Card style={{ height: '30%' }}>
                <div className="items-top flex space-x-2">
                    <Checkbox id="terms1" checked={isPersonalDataChecked} onCheckedChange={handlePersonalDataConsentChange}>
                        <Checkbox.Indicator>
                            {/* Customize your indicator here */}
                        </Checkbox.Indicator>
                    </Checkbox>
                    <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Use Personal Data
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            You agree to Feed the model with personal data.
                        </p>
                    </div>
                </div>

                <Select onValueChange={handleSelectChange} value={contentType}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="content type" required />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Types</SelectLabel>
                            <SelectItem value="message">Message</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Card>

            <Card style={{ height: '30vh', marginBottom: '1rem' }}>
                <div className="grid w-full h-full gap-2">
                    <textarea placeholder="Type your message here." value={userMessage} onChange={handleMessageChange} className="textarea"/>
                    <Button onClick={handleCreateClick}>Create</Button>
                </div>
            </Card>
        </Card>


                                    
                </div>

                <div className="bg-green-200 flex flex-col">
                    
                    <Card style={{ height: '95vh' }}>
                    
                    {messages.map((message, index) => (


                        <Alert>
                        <AlertTitle>{message.time}:</AlertTitle>
                        <Badge variant="destructive">Prototype</Badge>
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
