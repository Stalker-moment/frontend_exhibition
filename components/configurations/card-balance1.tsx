import React, { useState } from "react";
import { Card, CardBody, Button, Input } from "@nextui-org/react";

export const CardBalance1 = ({ config }: { config: { batchNumber: string; targetProduction: number; targetCycleTime: number; targetTotalTime: number; } }) => {
  const [showForm, setShowForm] = useState(false);
  const [newTargetProduction, setNewTargetProduction] = useState(config.targetProduction.toString());
  const [newTargetCycleTime, setNewTargetCycleTime] = useState(config.targetCycleTime.toString());

  const handleNewBatchClick = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = () => {
    // Update the config with new values (for demo, you can use console.log or other actions)
    console.log({
      batchNumber: config.batchNumber,
      targetProduction: newTargetProduction,
      targetCycleTime: newTargetCycleTime,
      targetTotalTime: config.targetTotalTime,
    });
    setShowForm(false);
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
              label="Target Production"
              placeholder="Enter target production"
              value={newTargetProduction}
              onChange={(e) => setNewTargetProduction(e.target.value)}
              className="text-white"
            />
            <Input
              fullWidth
              label="Target Cycle Time"
              placeholder="Enter target cycle time"
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