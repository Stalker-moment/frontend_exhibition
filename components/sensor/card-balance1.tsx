import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";

interface CardBalance1Props {
  current: number;
  unitCurrent: string;
}

export const CardBalance1: React.FC<CardBalance1Props> = ({ current, unitCurrent }) => {
  return (
    <Card className="bg-primary rounded-xl shadow-lg px-6 py-6 w-full h-full flex flex-col">
      <CardBody className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <AiFillThunderbolt className="w-8 h-8" />
          <div className="flex flex-col">
            <span className="text-white text-2xl font-semibold">Current</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white text-3xl font-bold">{current} {unitCurrent}</span>
        </div>
      </CardBody>
    </Card>
  );
};