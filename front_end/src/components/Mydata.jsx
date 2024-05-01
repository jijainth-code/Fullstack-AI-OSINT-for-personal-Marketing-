import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Mydata = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    fieldOfStudy: '',
    interests: ''
  });

  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      setError('Please log in to view the data.');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/get-results-user?id=${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUserData({
          name: data.personal_name || '',
          fieldOfStudy: data.personal_field_of_study || '',
          interests: data.personal_intrest || ''
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
        setError('Failed to load data');
        setLoading(false);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = async (event) => {
    event.preventDefault();
    if (!userId) {
      alert("No user ID found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/save-user-data?id=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) throw new Error('Failed to save data');
      const result = await response.json();
      console.log("Save result:", result);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Failed to save data:", error);
      alert("Failed to save data");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userId) return <div>Please log in to view the data.</div>;

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Full name" value={userData.name} onChange={handleChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fieldOfStudy">Field of Study</Label>
                <Input id="fieldOfStudy" name="fieldOfStudy" placeholder="e.g., Artificial Intelligence" value={userData.fieldOfStudy} onChange={handleChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="interests">Introduce yourself
                </Label>
                <Input id="interests" name="interests" placeholder="Give some of your selling points" value={userData.interests} onChange={handleChange} />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}></div>
            <CardFooter className="flex justify-center">
              <Button type="submit">Save Data</Button>
            </CardFooter>
          </form>
        </CardContent>
        
      </Card>
    </div>
  );
};

export default Mydata;
