"use client";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { TableWrapper } from "@/components/tableDowntime/table";
import { Steam } from "../chartsDowntime/steam";
import { format } from "date-fns";

export const Downtime = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [downtimeData, setDowntimeData] = useState(null);
  const [logsData, setLogsData] = useState([]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const formattedDate = format(selectedDate, "yyyy-MM");

      // Fetch downtime chart data
      const chartSocket = new WebSocket(
        `wss://machapi.akti.cloud/downtime-chart?date=${formattedDate}`
      );

      chartSocket.onopen = () => {
        console.log("WebSocket connection opened for chart.");
      };

      chartSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setDowntimeData(data);
      };

      chartSocket.onerror = (error) => {
        console.error("WebSocket error for chart:", error);
      };

      chartSocket.onclose = () => {
        console.log("WebSocket connection closed for chart.");
      };

      // Fetch downtime logs data
      const logsSocket = new WebSocket(
        `wss://machapi.akti.cloud/downtime-logs?date=${formattedDate}`
      );

      logsSocket.onopen = () => {
        console.log("WebSocket connection opened for logs.");
      };

      logsSocket.onmessage = (event) => {
        const logs = JSON.parse(event.data);
        setLogsData(logs);
      };

      logsSocket.onerror = (error) => {
        console.error("WebSocket error for logs:", error);
      };

      logsSocket.onclose = () => {
        console.log("WebSocket connection closed for logs.");
      };

      return () => {
        chartSocket.close();
        logsSocket.close();
      };
    };

    fetchData();
  }, [selectedDate]);

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>
        </li>
        <li className="flex gap-2">
          <ReportsIcon />
          <span>Down Time</span>
          <span> / </span>
        </li>
        <li className="flex gap-2">
          <span>Log</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Downtime Logger</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          {/* Month Picker */}
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM" // Format as YYYY-MM
            showMonthYearPicker // Show only month and year
            className="w-36 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            calendarClassName="border-primary rounded-lg"
            wrapperClassName="w-full"
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div>

      {/* Chart Component */}
      <div className="max-w-[95rem] mx-auto w-full mt-4">
        <Steam downtimeData={downtimeData} />
      </div>

      {/* Table Component */}
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper logsData={logsData} />
      </div>
    </div>
  );
};