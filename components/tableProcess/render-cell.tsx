import React, { useEffect, useState, useRef } from "react";
import { User, Tooltip, Chip } from "@nextui-org/react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";

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
}

interface Props {
  user: UserData;
  columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  const cellValue = (user as Record<string, any>)[columnKey as string];

  switch (columnKey) {
    case "status":
      const color =
        cellValue === "L40"
          ? "success"
          : cellValue === "L30"
          ? "danger"
          : "warning";

      return (
        <Chip size="sm" variant="flat" color={color}>
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );

    case "time":
      return <span>{user.time}</span>;

    case "date":
      return <span>{user.date}</span>;

    case "actions":
      return (
        <div className="flex items-center gap-4">
          <Tooltip content="Details">
            <button onClick={() => console.log("View user", user.id)}>
              <EyeIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
          <Tooltip content="Edit user" color="secondary">
            <button onClick={() => console.log("Edit user", user.id)}>
              <EditIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
          <Tooltip content="Delete user" color="danger">
            <button onClick={() => console.log("Delete user", user.id)}>
              <DeleteIcon size={20} fill="#FF0080" />
            </button>
          </Tooltip>
        </div>
      );

    default:
      return <span>{cellValue}</span>;
  }
};

export const UserTable = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const reconnectInterval = useRef<NodeJS.Timeout | null>(null);

  const connectWebSocket = () => {
    ws.current = new WebSocket("wss://machapi.akti.cloud/process");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current);
        reconnectInterval.current = null;
      }
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data) as UserData[];
      const updatedData = data.map((user) => {
        const startTime = new Date(user.startTime);
        return {
          ...user,
          time: startTime.toLocaleTimeString(),
          date: startTime.toLocaleDateString(),
        };
      });
      setUsers(updatedData);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected. Attempting to reconnect...");
      reconnectInterval.current = setInterval(() => {
        connectWebSocket();
      }, 5000); // Attempt to reconnect every 5 seconds
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
        clearInterval(reconnectInterval.current);
      }
    };
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Process</th>
            <th>Target</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <RenderCell user={user} columnKey="date" />
              </td>
              <td>
                <RenderCell user={user} columnKey="time" />
              </td>
              <td>
                <RenderCell user={user} columnKey="process" />
              </td>
              <td>
                <RenderCell user={user} columnKey="target" />
              </td>
              <td>
                <RenderCell user={user} columnKey="status" />
              </td>
              <td>
                <RenderCell user={user} columnKey="actions" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
