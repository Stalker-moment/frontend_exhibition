import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";

interface CardBalance1Props {
  current: number;
  unitCurrent: string;
  indexCurrent: "normal" | "low" | "over";
}

const statusColors = {
  normal: "bg-green-500", // Green for normal
  low: "bg-yellow-500",   // Yellow for low
  over: "bg-red-500",     // Red for over
};

export const CardBalance1: React.FC<CardBalance1Props> = ({ current, unitCurrent, indexCurrent }) => {
  return (
    <Card className="bg-primary rounded-xl shadow-lg px-6 py-6 w-full h-full flex flex-col relative">
      <CardBody className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <AiFillThunderbolt className="w-8 h-8 text-white" />
          <div className="flex flex-col">
            <span className="text-white text-2xl font-semibold">Current</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white text-3xl font-bold">{current} {unitCurrent}</span>
        </div>
      </CardBody>
      <div 
        className={`absolute top-2 right-2 w-16 h-8 flex items-center justify-center rounded-lg ${statusColors[indexCurrent]}`}
      >
        <span className="text-white text-xs font-semibold capitalize">{indexCurrent}</span>
      </div>
    </Card>
  );
};
