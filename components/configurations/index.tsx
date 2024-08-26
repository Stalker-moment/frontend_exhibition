"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DotsIcon } from "@/components/icons/accounts/dots-icon";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { TableWrapper } from "@/components/tableDowntime/table";
import { AiFillControl } from "react-icons/ai";
import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";

export const Configurations = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [card1Data, setCard1Data] = useState({
    batchNumber: "",
    targetProduction: 0,
    targetCycleTime: 0,
    targetTotalTime: 0,
  });
  const [card2Data, setCard2Data] = useState({
    current: "0",
    airPressure: "0",
  });

  useEffect(() => {
    const ws = new WebSocket("wss://machapi.akti.cloud/get-config");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WebSocket data:", data);

        // Update Card 1 data
        setCard1Data({
          batchNumber: data.idNow.toString(), // Adjust as needed
          targetProduction: data.targetProduction,
          targetCycleTime: data.targetCycleTime,
          targetTotalTime: data.targetTotalTimeHHMMSS,
        });

        // Update Card 2 data
        setCard2Data({
          current: data.maxCurrent.toString(),
          airPressure: data.maxPressure.toString(),
        });
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup WebSocket connection on unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <AiFillControl />
          <span>Configurations</span>
        </li>
      </ul>
      <div className="h-full px-2 py-6">
        <div className="flex flex-col gap-2 w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Batch Configurations</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <CardBalance1 config={card1Data} />
            </div>
            <h3 className="text-xl font-semibold">Standard Value Sensor</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <CardBalance2 sensorConfig={card2Data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};