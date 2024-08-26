import { Link, Navbar, NavbarContent } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FeedbackIcon } from "../icons/navbar/feedback-icon";
import { GithubIcon } from "../icons/navbar/github-icon";
import { SupportIcon } from "../icons/navbar/support-icon";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import Cookies from "js-cookie"; 
import { set } from "date-fns";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isDowntime, setIsDowntime] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("guest");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket("wss://machapi.akti.cloud/online");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setIsOnline(data.isOnline);
        setIsDowntime(data.downtime);
        setTime(data.time);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const token = Cookies.get("userAuth");
    if (token) {
      fetch("https://machapi.akti.cloud/api/users/token/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("Response status:", response.status);
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("API response data:", data);
          if (data.decoded) {
            setUserEmail(data.decoded.email || "guest");
          } else {
            console.error("Error with API response:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, []);   

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden justify-center">
          <div
            className={`flex items-center justify-center w-full h-10 p-2 rounded text-white font-semibold ${
              isOnline === null
                ? "bg-gray-500"
                : isOnline && !isDowntime
                ? "bg-green-500"
                : isOnline && isDowntime
                ? "bg-gradient" : "bg-red-500"
            }`}
          >
            {isOnline === null 
              ? "Connecting..."
              : isOnline && !isDowntime
              ? "Machine Online"
              : isOnline && isDowntime 
              ? `Machine Downtime ${time}` : "Machine Offline"}
          </div>
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          {/* <div className="flex items-center gap-2 max-md:hidden">
            <FeedbackIcon />
            <span>Feedback?</span>
          </div> */}

          <NotificationsDropdown />

          {/* <div className="max-md:hidden">
            <SupportIcon />
          </div> */}

          <Link
            href="https://github.com/Stalker-moment"
            target={"_blank"}
          >
            <GithubIcon />
          </Link>
          <NavbarContent>
            <UserDropdown email={userEmail} /> {/* Kirim email ke UserDropdown */}
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};