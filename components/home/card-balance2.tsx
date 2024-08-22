import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card, CardBody, Progress } from "@nextui-org/react";

export const CardBalance2 = () => {
  const [data, setData] = useState({
    quality: 0,
    performance: 0,
    availability: 0,
    OEE: 0,
    unit: "%",
  });
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  const connectWebSocket = useCallback(() => {
    ws.current = new WebSocket("wss://machapi.akti.cloud/oee");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
        reconnectTimeout.current = null;
      }
    };

    ws.current.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setData({
        quality: parsedData.quality || 0,
        performance: parseFloat(parsedData.performance) || 0,
        availability: parseFloat(parsedData.availability) || 0,
        OEE: parseFloat(parsedData.OEE) || 0,
        unit: parsedData.unit || "%",
      });
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected. Attempting to reconnect...");
      if (!reconnectTimeout.current) {
        reconnectTimeout.current = setTimeout(() => {
          connectWebSocket();
        }, 5000); // Attempt to reconnect after 5 seconds
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (ws.current?.readyState !== WebSocket.CLOSING && ws.current?.readyState !== WebSocket.CLOSED) {
        ws.current?.close();
      }
    };
  }, []);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [connectWebSocket]);

  return (
    <Card className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl shadow-lg px-6 py-6 w-full h-full flex flex-col">
      <CardBody className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-white text-7xl font-bold">OEE</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="text-white text-center text-7xl font-bold">
            {data.OEE}{data.unit}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-400 text-base">{"↓"}</span>
            <div className="flex flex-col">
              <span className="text-white text-lg font-semibold">
                {data.quality}{data.unit}
              </span>
              <span className="text-gray-400 text-sm">Quality</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-red-400 text-base">{"↑"}</span>
            <div className="flex flex-col">
              <span className="text-white text-lg font-semibold">
                {data.performance}{data.unit}
              </span>
              <span className="text-gray-400 text-sm">Performance</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-yellow-400 text-base">{"⭐"}</span>
            <div className="flex flex-col">
              <span className="text-white text-lg font-semibold">
                {data.availability}{data.unit}
              </span>
              <span className="text-gray-400 text-sm">Availability</span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Progress
            value={data.OEE}
            color="secondary"
            className="w-full h-6"
            aria-label="progress-bar"
          />
        </div>
      </CardBody>
    </Card>
  );
};