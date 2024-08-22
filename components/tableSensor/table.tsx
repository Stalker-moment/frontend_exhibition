import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow, TableColumn, Chip, Tooltip } from "@nextui-org/react";
import { EyeIcon } from "../icons/table/eye-icon";

interface TableWrapperProps {
  data: {
    id: number;
    timestamp: string;
    Current: number;
    indexCurrent: string;
    Pressure: number;
    indexPressure: string;
  }[];
}

const columns = [
  { name: "Timestamp", uid: "timestamp" },
  { name: "Current", uid: "Current" },
  { name: "Status Current", uid: "indexCurrent" },
  { name: "Pressure", uid: "Pressure" },
  { name: "Status Pressure", uid: "indexPressure" },
];

export const TableWrapper = ({ data }: TableWrapperProps) => {
  const renderCell = (item: any, columnKey: string) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "timestamp":
        return <span>{cellValue}</span>;
      case "indexCurrent":
      case "indexPressure":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={
              cellValue === "normal"
                ? "success"
                : cellValue === "over"
                ? "danger"
                : "warning"
            }
          >
            <span className="capitalize text-xs">{cellValue}</span>
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-4">
            <Tooltip content="Details">
              <button onClick={() => console.log("View Detail", item.id)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Table
        aria-label="Table sensor"
        isHeaderSticky
        bottomContent={null}
        classNames={{
          base: "max-h-[520px] rounded-lg shadow-inner",
          table: "min-h-[420px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="start">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};