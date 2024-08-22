"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
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

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      // Add your filtering logic here
    }
  };

  const sampleData = {
    batchNumber: "12345",
    targetProduction: 1000,
    targetCycleTime: 60, // in seconds
    targetTotalTime: 60000, // in seconds
  };

  const sampleData2 = {
    current: "5", // in Amperes
    airPressure: "3.5", // in Pascals
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
          <span>Configurations</span>
        </li>
      </ul>
      <div className="h-full px-2 py-6">
        <div className="flex flex-col gap-2 w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Batch Configurations</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <CardBalance1 config={sampleData} />
            </div>
            <h3 className="text-xl font-semibold">Standar Value Sensor</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <CardBalance2 sensorConfig={sampleData2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
