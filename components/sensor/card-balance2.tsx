import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { FaWind } from "react-icons/fa6";

interface CardBalance2Props {
  pressure: number;
  unitPressure: string;
}

export const CardBalance2: React.FC<CardBalance2Props> = ({ pressure, unitPressure }) => {
  return (
    <Card className="bg-green-700 rounded-xl shadow-lg px-6 py-6 w-full h-full flex flex-col">
      <CardBody className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <FaWind className="w-8 min-h-8" />
          <div className="flex flex-col">
            <span className="text-white text-2xl font-semibold">Air Pressure</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white text-3xl font-bold">{pressure} {unitPressure}</span>
        </div>
      </CardBody>
    </Card>
  );
};
