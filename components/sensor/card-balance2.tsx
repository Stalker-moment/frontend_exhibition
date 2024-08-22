import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { FaWind } from "react-icons/fa6";

interface CardBalance2Props {
  pressure: number;
  unitPressure: string;
  indexPressure: "normal" | "low" | "over";
}

const statusColors = {
  normal: "bg-green-500", // Green for normal
  low: "bg-yellow-500",   // Yellow for low
  over: "bg-red-500",     // Red for over
};

export const CardBalance2: React.FC<CardBalance2Props> = ({ pressure, unitPressure, indexPressure }) => {
  return (
    <Card className="bg-green-700 rounded-xl shadow-lg px-6 py-6 w-full h-full flex flex-col relative">
      <CardBody className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <FaWind className="w-8 min-h-8 text-white" />
          <div className="flex flex-col">
            <span className="text-white text-2xl font-semibold">Air Pressure</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white text-3xl font-bold">{pressure} {unitPressure}</span>
        </div>
      </CardBody>
      <div 
        className={`absolute top-2 right-2 w-16 h-8 flex items-center justify-center rounded-lg ${statusColors[indexPressure]}`}
      >
        <span className="text-white text-xs font-semibold capitalize">{indexPressure}</span>
      </div>
    </Card>
  );
};