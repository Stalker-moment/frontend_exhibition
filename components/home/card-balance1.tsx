import React, { useEffect, useState } from "react";
import { Card, CardBody, Progress } from "@nextui-org/react";
import { MdOutlineOutput } from "react-icons/md";
import { MdFileDownloadDone } from "react-icons/md";
import { FcProcess } from "react-icons/fc";
import { PiTargetBold } from "react-icons/pi";

export const CardBalance1 = () => {
  const [data, setData] = useState({
    batchNumber: 0,
    percentage: 0,
    Done: 0,
    Open: 0,
    target: 0,
  });

  useEffect(() => {
    const ws = new WebSocket("wss://machapi.akti.cloud/output");

    ws.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setData(parsedData);
    };

    // Cleanup WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <Card className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg px-6 py-6 w-full h-full flex flex-col">
      <CardBody className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-white text-7xl font-bold">Output</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="text-white text-7xl font-bold">{data.percentage}%</span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-400 text-base"><MdFileDownloadDone /></span>
            <div className="flex flex-col">
              <span className="text-white text-lg font-semibold">{data.Done}</span>
              <span className="text-gray-400 text-sm">Done</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-red-400 text-base"><FcProcess /></span>
            <div className="flex flex-col">
              <span className="text-white text-lg font-semibold">{data.Open}</span>
              <span className="text-gray-400 text-sm">Open</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-yellow-400 text-base"><PiTargetBold /></span>
            <div className="flex flex-col">
              <span className="text-white text-lg font-semibold">{data.target}</span>
              <span className="text-gray-400 text-sm">Target</span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Progress 
            value={data.percentage} 
            color="secondary" 
            className="w-full h-6"
            aria-label="progress-bar"
          />
        </div>
      </CardBody>
    </Card>
  );
};