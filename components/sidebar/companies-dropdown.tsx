"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { AcmeIcon } from "../icons/acme-icon";
import { AcmeLogo } from "../icons/acmelogo";
import { BottomIcon } from "../icons/sidebar/bottom-icon";

interface Machine {
  name: string;
  location: string;
  logo: React.ReactNode;
  status: string;
  statusBg: string;
}

export const CompaniesDropdown = () => {
  const [machine, setMachine] = useState<Machine>({
    name: "Machine 1",
    location: "Advanced Machine#1",
    logo: <AcmeIcon />,
    status: "Offline",
    statusBg: "bg-red-500",
  });

  useEffect(() => {
    const ws = new WebSocket("wss://machapi.akti.cloud/online");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.isOnline && !data.downtime) {
        setMachine((prevMachine) => ({
          ...prevMachine,
          status: "Online",
          statusBg: "bg-green-500",
        }));
      } else if (data.isOnline && data.downtime) {
        setMachine((prevMachine) => ({
          ...prevMachine,
          status: "Downtime",
          statusBg: "bg-yellow-500",
        }));
      } else {
        setMachine((prevMachine) => ({
          ...prevMachine,
          status: "Offline",
          statusBg: "bg-red-500",
        }));
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">
          {machine.logo}
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-medium m-0 text-default-900 whitespace-nowrap">
              {machine.name}
            </h3>
            <span className="text-xs font-medium text-default-500">
              {machine.location}
            </span>
            <div className={`mt-1 px-1.5 py-0.25 text-[10px] rounded-full text-white ${machine.statusBg}`}>
              {machine.status}
            </div>
          </div>
          <BottomIcon />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(e) => {
          if (e === "1") {
            setMachine({
              name: "Machine 1",
              location: "Advanced Machine#1",
              logo: <AcmeIcon />,
              status: "Offline",
              statusBg: "bg-red-500",
            });
          }
          if (e === "2") {
            setMachine({
              name: "Machine 2",
              location: "Advanced Machine#2",
              logo: <AcmeLogo />,
              status: "Unknown",
              statusBg: "bg-gray-500",
            });
          }
          if (e === "3") {
            setMachine({
              name: "Machine 3",
              location: "Basic Machine#1",
              logo: <AcmeIcon />,
              status: "Unknown",
              statusBg: "bg-gray-500",
            });
          }
          if (e === "4") {
            setMachine({
              name: "Machine 4",
              location: "Basic Machine#2",
              logo: <AcmeIcon />,
              status: "Unknown",
              statusBg: "bg-gray-500",
            });
          }
        }}
        aria-label="Machine Actions"
      >
        <DropdownSection title="Machine">
          <DropdownItem
            key="1"
            startContent={<AcmeIcon />}
            description="Advanced Machine#1"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Machine 1
          </DropdownItem>
          <DropdownItem
            key="2"
            startContent={<AcmeLogo />}
            description="Advanced Machine#2"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Machine 2
          </DropdownItem>
          <DropdownItem
            key="3"
            startContent={<AcmeIcon />}
            description="Basic Machine#1"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Machine 3
          </DropdownItem>
          <DropdownItem
            key="4"
            startContent={<AcmeIcon />}
            description="Basic Machine#2"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Machine 4
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};