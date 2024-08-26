import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center">
      <span className="mr-3 text-sm text-gray-500 dark:text-gray-400">
        {isDark ? "Dark Mode" : "Light Mode"}
      </span>
      <Switch
        isSelected={isDark}
        onValueChange={(e) => setTheme(e ? "dark" : "light")}
        size="lg"
        classNames={{
          thumb: `transition-transform duration-300 ease-in-out ${
            isDark ? "transform translate-x-[0.1rem] bg-yellow-400" : "bg-white"
          }`,
        }}
      />
    </div>
  );
};
