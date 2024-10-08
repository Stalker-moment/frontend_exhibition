import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { users } from "./data";

interface Props {
  user: (typeof users)[number];
  columnKey: any;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  const cellValue = (user as Record<string, any>)[columnKey as string];

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
          name={cellValue}
        >
          {user.email}
        </User>
      );

    case "role":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
          <div>
            <span>{user.team}</span>
          </div>
        </div>
      );

    case "status":
      const color =
        cellValue === "active"
          ? "success"
          : cellValue === "paused"
          ? "danger"
          : "warning";

      return (
        <Chip size="sm" variant="flat" color={color}>
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );

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