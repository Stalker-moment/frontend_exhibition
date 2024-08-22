"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import { AcmeIcon } from "../icons/acme-icon";
import { AcmeLogo } from "../icons/acmelogo";
import { BottomIcon } from "../icons/sidebar/bottom-icon";

interface Machine {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
  const [Machine, setMachine] = useState<Machine>({
    name: "Machine 1",
    location: "Advanced Machine#1",
    logo: <AcmeIcon />,
  });
  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">
          {Machine.logo}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
              {Machine.name}
            </h3>
            <span className="text-xs font-medium text-default-500">
              {Machine.location}
            </span>
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
            });
          }
          if (e === "2") {
            setMachine({
              name: "Machine 2",
              location: "Advanced Machine#2",
              logo: <AcmeLogo />,
            });
          }
          if (e === "3") {
            setMachine({
              name: "Machine 3",
              location: "Basic Machine#1",
              logo: <AcmeIcon />,
            });
          }
          if (e === "4") {
            setMachine({
              name: "Machine 4",
              location: "Basic Machine#2",
              logo: <AcmeIcon />,
            });
          }
        }}
        aria-label="Avatar Actions"
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
