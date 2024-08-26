import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { MdOutlineOutput } from "react-icons/md";
import { MdFileDownloadDone } from "react-icons/md";
import { FcProcess } from "react-icons/fc";
import { PiTargetBold } from "react-icons/pi";
import dynamic from "next/dynamic";

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

export const CardBalance1 = () => {
  const [data, setData] = useState({
    batchNumber: 0,
    percentage: 0,
    Done: 0,
    Open: 0,
    target: 0,
    OK: 0,
    NG: 0,
    PROCESS: 0,
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
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col">
            <span className="text-white text-4xl md:text-7xl font-bold">Output</span>
          </div>
          {data.PROCESS > 0 && (
            <Card className="bg-yellow-400 text-black rounded-lg px-4 py-2 mt-2 md:mt-0 md:ml-4">
              <span className="text-lg font-semibold">On Process</span>
            </Card>
          )}
        </div>
        <div className="w-full">
          <GaugeComponent
            arc={{
              width: 0.4,
              padding: 0.005,
              cornerRadius: 5,
              subArcs: [
                {
                  limit: 30,
                  color: "#EA4228",
                  showTick: true,
                  tooltip: {
                    text: "Low percentage!",
                    style: { fontSize: "8px" },
                  },
                },
                {
                  limit: 80,
                  color: "#FE9900",
                  showTick: true,
                  tooltip: {
                    text: "Mid percentage!",
                    style: { fontSize: "8px" },
                  },
                },
                {
                  limit: 100,
                  color: "#57BE2F",
                  showTick: true,
                  tooltip: {
                    text: "Good!",
                    style: { fontSize: "8px" },
                  },
                },
              ],
            }}
            pointer={{
              color: "#345243",
              length: 0.8,
              width: 10,
            }}
            labels={{
              valueLabel: {
                formatTextValue: (value) => value + "%",
                style: { fontSize: "35px" },
              },
              tickLabels: {
                type: "outer",
                ticks: [{ value: data.percentage }],
              },
            }}
            value={data.percentage}
            minValue={0}
            maxValue={100}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-400 text-base">
              <MdFileDownloadDone />
            </span>
            <div className="flex flex-col">
              <span className="text-white text-lg font-semibold">
                {data.Done}
              </span>
              <span className="text-gray-400 text-sm">Done</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-red-400 text-base">
              <FcProcess />
            </span>
            <div className="flex flex-col">
              <span className="text-white text-lg font-semibold">
                {data.Open}
              </span>
              <span className="text-gray-400 text-sm">Open</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-yellow-400 text-base">
              <PiTargetBold />
            </span>
            <div className="flex flex-col">
              <span className="text-white text-lg font-semibold">
                {data.target}
              </span>
              <span className="text-gray-400 text-sm">Target</span>
            </div>
          </div>

          {/* New Cards for OK and NG */}
          <div className="flex w-full md:w-auto gap-4">
            <Card className="flex items-center gap-2 bg-gray-700 text-white rounded-lg px-4 py-2 flex-1">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-blue-400 text-lg">OK</span>
                <span className="text-white text-lg font-semibold">
                  {data.OK}
                </span>
              </div>
            </Card>

            <Card className="flex items-center gap-2 bg-gray-700 text-white rounded-lg px-4 py-2 flex-1">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-orange-400 text-lg">NG</span>
                <span className="text-white text-lg font-semibold">
                  {data.NG}
                </span>
              </div>
            </Card>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};