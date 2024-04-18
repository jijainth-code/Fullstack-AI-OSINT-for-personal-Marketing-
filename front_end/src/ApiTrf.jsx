import React, { useState } from "react";
import axios from "axios";

function App() {
  const [capturedData, setCapturedData] = useState(null);

  const captureData = async () => {
    const dataToSend = { key: 8 };  // Data to be sent to the backend server
    try {
      const response = await axios.post('http://localhost:8080/capture-data', dataToSend);
      console.log("Data posted successfully:", response.data);

      const res = await axios.get('http://localhost:8080/get-captured-data');
      setCapturedData(res.data);
      console.log("Data received successfully:", res.data);
    } catch (error) {
      console.error("Failed to capture data:", error);
    }
  };

  return (
    <div>
      <h1>Trigger Python Function</h1>
      <button className="btn btn_danger" onClick={captureData}>Capture Data and Fetch</button>
      {capturedData && (
        <div>
          <h2>Processed Data:</h2>
          <p>{JSON.stringify(capturedData)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
