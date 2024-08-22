import React from "react";
import { Card, CardBody } from "@nextui-org/react";

const IndicatorLamp = ({ name, isOn }: { name: string; isOn: boolean }) => {
  const lampColor = isOn ? "bg-green-500" : "bg-red-500";
  const textColor = isOn ? "text-white" : "text-gray-300";

  return (
    <div className="flex flex-col items-center w-24 mb-4 mx-2">
      <div
        className={`w-16 h-16 rounded-full ${lampColor} flex items-center justify-center shadow-lg transition-transform transform hover:scale-110`}
      >
        <span className={`text-base font-medium ${textColor}`}>
          {isOn ? "ON" : "OFF"}
        </span>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-200">{name}</span>
    </div>
  );
};

export const CardBalance1 = ({ indicators = [] }: { indicators: { name: string; isOn: boolean; }[] }) => {
  return (
    <Card className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl shadow-lg p-4 h-full flex flex-col">
      <CardBody className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          {indicators.length > 0 ? (
            indicators.map((indicator, index) => (
              <IndicatorLamp key={index} name={indicator.name} isOn={indicator.isOn} />
            ))
          ) : (
            <span className="text-gray-300">No indicators available</span>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

// Example usage
export const ExampleUsage = () => {
  const indicators = [
    { name: "Power", isOn: true },
    { name: "DownTime", isOn: false },
    { name: "Air", isOn: true },
    { name: "MachiningComp", isOn: false },
    { name: "L40Parts", isOn: true },
    { name: "L30Parts", isOn: true },
    { name: "PLCRun", isOn: false },
    { name: "MasterOn", isOn: true },
  ];

  return <CardBalance1 indicators={indicators} />;
};
