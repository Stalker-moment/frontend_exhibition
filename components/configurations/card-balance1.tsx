import React, { useState, useEffect } from "react";
import { Card, CardBody, Button, Input } from "@nextui-org/react";
import Cookies from "js-cookie"; 

export const CardBalance1 = ({ config }: { config: { batchNumber: string; targetProduction: number; targetCycleTime: number; targetTotalTime: number; } }) => {
  const [showForm, setShowForm] = useState(false);
  const [newTargetProduction, setNewTargetProduction] = useState(config.targetProduction.toString());
  const [newTargetCycleTime, setNewTargetCycleTime] = useState(config.targetCycleTime.toString());

  useEffect(() => {
    const ws = new WebSocket("wss://machapi.akti.cloud/get-config");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setNewTargetProduction(data.targetProduction.toString());
        setNewTargetCycleTime(data.targetCycleTime.toString());
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

  const handleNewBatchClick = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async () => {
    try {
      // Wait for the token to be resolved
      const token = Cookies.get('userAuth');

      if (!token) {
        console.error('Authorization token not found');
        return;
      }

      const requestHeaders = new Headers();
      requestHeaders.append('Authorization', `Bearer ${token}`);
      requestHeaders.append('Content-Type', 'application/json');

      const requestBody = JSON.stringify({
        production: parseInt(newTargetProduction),
        time: parseInt(newTargetCycleTime),
      });

      const response = await fetch('https://machapi.akti.cloud/api/internal/config/new', {
        method: 'POST',
        headers: requestHeaders,
        body: requestBody,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('API response:', result);
        setShowForm(false);
      } else {
        console.error('Failed to update config:', response.statusText);
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
            <span><strong>Batch Number:</strong> {config.batchNumber}</span>
          </div>
          <div>
            <span><strong>Target Production:</strong> {config.targetProduction}</span>
          </div>
          <div>
            <span><strong>Target Cycle Time:</strong> {config.targetCycleTime} seconds</span>
          </div>
          <div>
            <span><strong>Target Total Time:</strong> {config.targetTotalTime} seconds</span>
          </div>
        </div>
        
        <Button className="mt-4 max-w-40 bg-green-500 hover:bg-green-600 text-white" onPress={handleNewBatchClick}>
          New Batch
        </Button>

        {showForm && (
          <div className="mt-4 flex flex-col gap-4 bg-gray p-4 rounded-lg shadow-lg">
            <Input
              fullWidth
              label="Target Production (Qty)"
              placeholder={newTargetProduction}
              value={newTargetProduction}
              onChange={(e) => setNewTargetProduction(e.target.value)}
              className="text-white"
            />
            <Input
              fullWidth
              label="Target Cycle Time (seconds)"
              placeholder={newTargetCycleTime}
              value={newTargetCycleTime}
              onChange={(e) => setNewTargetCycleTime(e.target.value)}
              className="text-white"
            />
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-500 hover:bg-gray-600 text-white" onPress={handleNewBatchClick}>
                Cancel
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white" onPress={handleSubmit}>
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
  const config = {
    batchNumber: "12345",
    targetProduction: 1000,
    targetCycleTime: 60, // in seconds
    targetTotalTime: 60000, // in seconds
  };

  return <CardBalance1 config={config} />;
};