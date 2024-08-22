import React, { useState } from "react";
import { Card, CardBody, Button, Input } from "@nextui-org/react";

export const CardBalance2 = ({ sensorConfig }: { sensorConfig: { current: string; airPressure: string; } }) => {
  const [showForm, setShowForm] = useState(false);
  const [newCurrent, setNewCurrent] = useState(sensorConfig.current);
  const [newAirPressure, setNewAirPressure] = useState(sensorConfig.airPressure);

  const handleEditClick = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = () => {
    // Update the sensorConfig with new values (for demo, you can use console.log or other actions)
    console.log({
      current: newCurrent,
      airPressure: newAirPressure,
    });
    setShowForm(false);
  };

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-indigo-700 rounded-xl shadow-lg p-4 h-full flex flex-col">
      <CardBody className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 text-white">
          <div>
            <span><strong>Current:</strong> {sensorConfig.current} A</span>
          </div>
          <div>
            <span><strong>Air Pressure:</strong> {sensorConfig.airPressure} bar</span>
          </div>
        </div>
        
        <Button className="mt-4 max-w-40 bg-green-500 hover:bg-green-600 text-white" onPress={handleEditClick}>
          Edit
        </Button>

        {showForm && (
          <div className="mt-4 flex flex-col gap-4 bg-gray p-4 rounded-lg shadow-lg">
            <Input
              fullWidth
              label="Current"
              placeholder="Enter current value"
              value={newCurrent}
              onChange={(e) => setNewCurrent(e.target.value)}
              className="text-white"
            />
            <Input
              fullWidth
              label="Air Pressure"
              placeholder="Enter air pressure value"
              value={newAirPressure}
              onChange={(e) => setNewAirPressure(e.target.value)}
              className="text-white"
            />
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-500 hover:bg-gray-600 text-white" onPress={handleEditClick}>
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
  const sensorConfig = {
    current: "5", // in Amperes
    airPressure: "3.5", // in Bar
  };

  return <CardBalance2 sensorConfig={sensorConfig} />;
};
