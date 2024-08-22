import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { RenderCell } from "./render-cell";

interface UserData {
  id: number;
  idNow: number;
  process: number;
  target: number;
  startTime: string;
  endTime: string;
  processTime: number;
  status: string;
  time?: string;
  date?: string;
  cycleTime?: string;
}

export const TableWrapper = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const reconnectInterval = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const columns = [
    { name: "Date", uid: "date" },
    { name: "Time", uid: "time" },
    { name: "Process", uid: "process" },
    { name: "Target", uid: "target" },
    { name: "Cycle Time", uid: "cycleTime" }, // New column for Cycle Time
    { name: "Status", uid: "status" },
  ];

  const connectWebSocket = () => {
    if (reconnectAttempts.current >= maxReconnectAttempts) {
      console.log("Max reconnect attempts reached. Stopping further attempts.");
      return;
    }

    ws.current = new WebSocket("wss://machapi.akti.cloud/process");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      reconnectAttempts.current = 0;
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current);
        reconnectInterval.current = null;
      }
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data) as UserData[];
      const updatedData = data.map((user) => {
        const startTime = new Date(user.startTime);
        const cycleTime = `${user.processTime} sec`; // Format the processTime as cycleTime

        return {
          ...user,
          time: startTime.toLocaleTimeString(),
          date: startTime.toLocaleDateString(),
          cycleTime, // Add cycleTime to the user data
        };
      });
      setUsers(updatedData);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected. Attempting to reconnect...");
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectInterval.current = setTimeout(() => {
          reconnectAttempts.current += 1;
          connectWebSocket();
        }, 5000); // Attempt to reconnect after 5 seconds
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      ws.current?.close();
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      if (reconnectInterval.current) {
        clearTimeout(reconnectInterval.current);
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  <RenderCell user={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};