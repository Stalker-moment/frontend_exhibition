"use client";
import React from "react";
import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { DataLogger } from "./DataLogger"; // Import the new DataLogger component
import { TableWrapper } from "@/components/tableProcess/table";

export const Content = () => (
  <div className="h-full px-2 py-6">
    <div className="flex flex-col gap-2 w-full">
      {/* Card Section Top */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Realtime Data Process</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardBalance1 />
          <CardBalance2 />
        </div>
      </div>
      {/* Data Logger Section */}
      <div className="mt-6">
        <TableWrapper />
      </div>
    </div>
  </div>
);
