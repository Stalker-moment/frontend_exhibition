import React, { useState, useEffect } from "react";
import { Card, CardBody, Button, Input } from "@nextui-org/react";
import Cookies from "js-cookie"; 

export const CardBalance2 = ({ sensorConfig }: { sensorConfig: { current: string; airPressure: string; } }) => {
  const [showForm, setShowForm] = useState(false);
  const [newCurrent, setNewCurrent] = useState(sensorConfig.current);
  const [newAirPressure, setNewAirPressure] = useState(sensorConfig.airPressure);

  useEffect(() => {
    const ws = new WebSocket("wss://machapi.akti.cloud/get-config");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setNewCurrent(data.maxCurrent.toString());
        setNewAirPressure(data.maxPressure.toString());
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup WebSocket connection on unmount
    return () => {
      ws.close();
    };
  }, []);

  const handleEditClick = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async () => {
    try {
      const token = Cookies.get('userAuth');
      console.log('Token:', token);

      if (!token) {
        console.error('Authorization token not found');
        return;
      }

      const requestHeaders = new Headers();
      requestHeaders.append('Authorization', `Bearer ${token}`);
      requestHeaders.append('Content-Type', 'application/json');

      const requestBody = JSON.stringify({
        current: parseFloat(newCurrent),
        pressure: parseFloat(newAirPressure),
      });

      const response = await fetch('https://machapi.akti.cloud/api/internal/config/sensor', {
        method: 'POST',
        headers: requestHeaders,
        body: requestBody,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('API response:', result);
        setShowForm(false);
      } else {
        console.error('Failed to update sensor data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-indigo-700 rounded-xl shadow-lg p-4 h-full flex flex-col">
      <CardBody className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 text-white">
          <div>
            <span><strong>Current:</strong> {sensorConfig.current} mA</span>
          </div>
          <div>
            <span><strong>Air Pressure:</strong> {sensorConfig.airPressure} bar</span>
          </div>
        </div>
        
        <Button className="mt-4 max-w-40 bg-green-500 hover:bg-green-600 text-white" onClick={handleEditClick}>
          Edit
        </Button>

        {showForm && (
          <div className="mt-4 flex flex-col gap-4 bg-gray p-4 rounded-lg shadow-lg">
            <Input
              fullWidth
              label="Current (mA)"
              placeholder={newCurrent}
              value={newCurrent}
              onChange={(e) => setNewCurrent(e.target.value)}
              className="text-white"
            />
            <Input
              fullWidth
              label="Air Pressure (bar)"
              placeholder={newAirPressure}
              value={newAirPressure}
              onChange={(e) => setNewAirPressure(e.target.value)}
              className="text-white"
            />
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-500 hover:bg-gray-600 text-white" onClick={handleEditClick}>
                Cancel
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

// Example usage
export const ExampleUsage = () => {
  const sensorConfig = {
    current: "5", // in Amperes
    airPressure: "3.5", // in Bar
  };

  return <CardBalance2 sensorConfig={sensorConfig} />;
};