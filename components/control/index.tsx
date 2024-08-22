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

export const Control = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [indicators, setIndicators] = useState([
    { name: "Power", isOn: false },
    { name: "DownTime", isOn: false },
    { name: "Air", isOn: false },
    { name: "MachiningComp", isOn: false },
    { name: "L40Parts", isOn: false },
    { name: "L30Parts", isOn: false },
    { name: "Running", isOn: false },
    { name: "MasterOn", isOn: false },
  ]);

  useEffect(() => {
    // Create WebSocket connection
    const socket = new WebSocket("wss://machapi.akti.cloud/lamp");

    // Connection opened
    socket.addEventListener("open", () => {
      console.log("Connected to WebSocket");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        const newIndicators = Object.keys(data).map(key => ({
          name: key,
          isOn: data[key],
        }));
        setIndicators(newIndicators);
      } catch (error) {
        console.error("Error parsing WebSocket message", error);
      }
    });

    // Connection closed
    socket.addEventListener("close", () => {
      console.log("Disconnected from WebSocket");
    });

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      // Add your filtering logic here
    }
  };

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
          <span>Machine Control</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Log</span>
        </li>
      </ul>
      <div className="h-full px-2 py-6">
        <div className="flex flex-col gap-2 w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Indicator Lamp Control</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <CardBalance1 indicators={indicators} />
            </div>
            <h3 className="text-xl font-semibold">Button Control</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <CardBalance2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};