import { Card, CardBody, Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

// Define API endpoints
const API_ENDPOINTS = {
  Auto: "https://machapi.akti.cloud/api/internal/switch/auto",
  FaultReset: "https://machapi.akti.cloud/api/internal/switch/fault-reset",
  Stop: "https://machapi.akti.cloud/api/internal/switch/stop",
  MasterOn: "https://machapi.akti.cloud/api/internal/switch/master-on",
};

// WebSocket URL
const WEBSOCKET_URL = "wss://machapi.akti.cloud/receive";

export const CardBalance2 = () => {
  const [buttonStates, setButtonStates] = useState({
    Auto: false,
    FaultReset: false,
    Stop: false,
    MasterOn: false,
  });

  useEffect(() => {
    // Create WebSocket connection
    const socket = new WebSocket(WEBSOCKET_URL);

    // Connection opened
    socket.addEventListener("open", () => {
      console.log("Connected to WebSocket");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        setButtonStates({
          Auto: data.AutoButton,
          FaultReset: data.FaultResetButton,
          Stop: data.StopButton,
          MasterOn: data.MasterOnButton,
        });
      } catch (error) {
        console.error("Error parsing WebSocket message", error);
      }
    });

    // Connection closed
    socket.addEventListener("close", () => {
      console.log("Disconnected from WebSocket");
    });

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);

  const handleButtonClick = async (action: keyof typeof buttonStates) => {
    // Toggle the button state
    const newState = !buttonStates[action];
    setButtonStates((prevState) => ({
      ...prevState,
      [action]: newState,
    }));

    // Send API request with the new state
    try {
      const response = await fetch(API_ENDPOINTS[action], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: newState }),
      });

      if (!response.ok) {
        throw new Error("Failed to update button state");
      }
    } catch (error) {
      console.error("Error sending API request", error);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl shadow-lg px-6 py-6 w-full h-full flex flex-col">
      <CardBody className="flex flex-col gap-6">
        <div className="flex flex-wrap justify-around gap-4 mt-4">
          {Object.keys(buttonStates).map((key) => (
            <Button
              key={key}
              className={`w-24 rounded-lg transition-transform transform hover:scale-105 ${
                buttonStates[key as keyof typeof buttonStates]
                  ? "bg-green-500"
                  : "bg-red-500"
              } text-white`}
              onPress={() => handleButtonClick(key as keyof typeof buttonStates)}
            >
              {key}
            </Button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};