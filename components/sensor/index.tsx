"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineStock } from "react-icons/ai";
import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { Steam } from "../charts/steam";
import { TableWrapper } from "@/components/tableSensor/table";
import { ExportIcon } from "../icons/accounts/export-icon";

export const Sensor = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sensorData, setSensorData] = useState({
    Current: 0,
    UnitCurrent: "A",
    Pressure: 0,
    UnitPressure: "bar",
    IndexCurrent: "normal",
    IndexPressure: "normal",
    Power: 0,
  });
  const [chartData, setChartData] = useState({
    TimeChart: [],
    Current: [],
    Pressure: [],
  });
  const [sensorLogs, setSensorLogs] = useState([]);

  useEffect(() => {
    // Reconnect WebSocket on date change
    const dateString = selectedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    const sensorSocket = new WebSocket(`wss://machapi.akti.cloud/sensor-logs?date=${dateString}`);

    sensorSocket.addEventListener("open", () => {
      console.log("Connected to Sensor Logs WebSocket");
    });

    sensorSocket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        setSensorLogs(data);
      } catch (error) {
        console.error("Error parsing WebSocket message", error);
      }
    });

    sensorSocket.addEventListener("close", () => {
      console.log("Disconnected from Sensor Logs WebSocket");
    });

    return () => {
      sensorSocket.close();
    };
  }, [selectedDate]);

  useEffect(() => {
    // Sensor WebSocket
    const sensorSocket = new WebSocket("wss://machapi.akti.cloud/sensor");

    sensorSocket.addEventListener("open", () => {
      console.log("Connected to Sensor WebSocket");
    });

    sensorSocket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        setSensorData({
          Current: data.Current,
          UnitCurrent: data.UnitCurrent,
          Pressure: data.Pressure,
          UnitPressure: data.UnitPressure,
          IndexCurrent: data.indexCurrent,
          IndexPressure: data.indexPressure,
          Power: data.Power,
        });
      } catch (error) {
        console.error("Error parsing WebSocket message", error);
      }
    });

    sensorSocket.addEventListener("close", () => {
      console.log("Disconnected from Sensor WebSocket");
    });

    return () => {
      sensorSocket.close();
    };
  }, []);

  useEffect(() => {
    // Chart WebSocket
    const chartSocket = new WebSocket("wss://machapi.akti.cloud/sensor-chart");

    chartSocket.addEventListener("open", () => {
      console.log("Connected to Chart WebSocket");
    });

    chartSocket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        setChartData({
          TimeChart: data.TimeChart,
          Current: data.Current,
          Pressure: data.Pressure,
        });
      } catch (error) {
        console.error("Error parsing Chart WebSocket message", error);
      }
    });

    chartSocket.addEventListener("close", () => {
      console.log("Disconnected from Chart WebSocket");
    });

    return () => {
      chartSocket.close();
    };
  }, []);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <AiOutlineStock />
          <span>Monitoring Sensor</span>
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
            <h3 className="text-xl font-semibold">Realtime Data Sensor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardBalance1 current={sensorData.Current} unitCurrent={sensorData.UnitCurrent} indexCurrent={sensorData.IndexCurrent as "normal" | "low" | "over"} Power={sensorData.Power} />
              <CardBalance2 pressure={sensorData.Pressure} unitPressure={sensorData.UnitPressure} indexPressure={sensorData.IndexPressure as "normal" | "low" | "over"} />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between flex-wrap gap-4 items-center">
              {/* <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                className="w-36 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                calendarClassName="border-primary rounded-lg"
                dayClassName={(date) =>
                  date.getDay() === 0 ? "text-red-500" : "text-gray-900"
                }
                wrapperClassName="w-full"
              /> */}
            </div>
            <div className="max-w-[95rem] mx-auto w-full">
              <Steam chartData={chartData} />
            </div>
          </div>

          <h3 className="text-xl mt-5 font-semibold">Sensor Logger</h3>
          <div className="flex justify-between flex-wrap gap-4 items-center">
            <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
              <Button color="primary" startContent={<ExportIcon />}>
                Export to CSV
              </Button>
            </div>
          </div>
          <div className="max-w-[95rem] mx-auto w-full">
            <TableWrapper data={sensorLogs} />
          </div>
        </div>
      </div>
    </div>
  );
};