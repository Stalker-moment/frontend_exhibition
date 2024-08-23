import React, { useEffect, useState } from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { SensorIcon } from "../icons/sensor-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { AiFillControl, AiOutlineStock } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie for handling cookies

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const [isGuest, setIsGuest] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const userAuth = Cookies.get("userAuth"); // Get userAuth from cookies

      if (!userAuth || userAuth === "guest") {
        setIsGuest(true); // User is guest
      } else {
        try {
          // Validate the token with the API
          const response = await fetch(
            "https://machapi.akti.cloud/api/users/token/validator",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: userAuth, // Send userAuth as the Authorization header
              },
            }
          );

          if (response.ok) {
            setIsValidUser(true); // Token is valid, user is authenticated
          } else {
            setIsGuest(true); // Token is invalid, fallback to guest
          }
        } catch (error) {
          console.error("Error validating token:", error);
          setIsGuest(true); // In case of an error, treat as guest
        }
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Menu">
              <SidebarItem
                isActive={pathname === "/downtime"}
                title="Down Time"
                icon={<ReportsIcon />}
                href="/downtime"
              />
              <SidebarItem
                isActive={pathname === "/sensor"}
                title="Monitoring Sensor"
                icon={<AiOutlineStock />}
                href="/sensor"
              />
            </SidebarMenu>

            {!isGuest && isValidUser && (
              <SidebarMenu title="Admin">
                <SidebarItem
                  isActive={pathname === "/accounts"}
                  title="Accounts"
                  icon={<AccountsIcon />}
                  href="accounts"
                />
                <SidebarItem
                  isActive={pathname === "/control"}
                  title="Machine Control"
                  icon={<AiFillControl />}
                  href="/control"
                />
                <SidebarItem
                  isActive={pathname === "/configurations"}
                  title="Configurations"
                  icon={<DevIcon />}
                  href="configurations"
                />
              </SidebarMenu>
            )}
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
