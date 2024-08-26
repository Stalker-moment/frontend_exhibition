import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const columns = [
  { uid: "idNow", name: "ID" },
  { uid: "dateStart", name: "Date" },
  { uid: "timeStart", name: "Start Time" },
  { uid: "timeEnd", name: "End Time" },
  { uid: "timeDownStr", name: "Downtime" },
  { uid: "description", name: "Description" },
];

export const TableWrapper = ({ logsData }: { logsData: any[] }) => {
  // Display logs data in the table
  const displayedItems = logsData;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Title Section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Downtime Logs</h3>
      </div>

      <Table
        aria-label="Table Process"
        isHeaderSticky
        bottomContent={null}
        classNames={{
          base: "max-h-[520px] rounded-lg shadow-inner",
          table: "table-auto", // Use auto table layout
          tbody: "align-top"    // Ensure content aligns to the top
        }}
      >
        <TableHeader columns={columns} className="sticky-header">
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

        <TableBody items={displayedItems}>
          {(item: any) => (
            <TableRow key={item.idNow}>
              {(columnKey) => (
                <TableCell>
                  {item[columnKey] ?? "N/A"} {/* Handle missing values */}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <style jsx>
        {`
          .sticky-header {
            position: sticky;
            top: 0;
            z-index: 10;
            background-color: #f9fafb;
            border-bottom: 1px solid #e5e7eb; /* Add a border for better separation */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add shadow for better visibility */
          }
        `}
      </style>
    </div>
  );
};