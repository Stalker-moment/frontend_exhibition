import dynamic from "next/dynamic";
import React from "react";
import { Props } from "react-apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import("react-apexcharts");

interface SteamProps {
  chartData: {
    TimeChart: string[];
    Current: number[];
    Pressure: number[];
  };
}

const chartOptions: Props["options"] = {
  chart: {
    type: "line",
    animations: {
      easing: "easeinout",
      speed: 800,
    },
    background: "hsl(var(--nextui-background))",
    foreColor: "hsl(var(--nextui-default-800))",
    toolbar: {
      show: true,
      tools: {
        download: false,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
    zoom: {
      enabled: true,
    },
  },
  xaxis: {
    categories: [],
    labels: {
      style: {
        colors: "hsl(var(--nextui-default-800))",
        fontSize: "12px",
        fontFamily: "inherit",
      },
    },
    axisBorder: {
      color: "hsl(var(--nextui-default-300))",
    },
    axisTicks: {
      color: "hsl(var(--nextui-default-300))",
    },
  },
  yaxis: [
    {
      labels: {
        style: {
          colors: "hsl(var(--nextui-default-800))",
          fontSize: "12px",
          fontFamily: "inherit",
        },
        formatter: (value) => `${value} mA`,
      },
      title: {
        text: "Current (mA)",
        style: {
          color: "hsl(var(--nextui-default-800))",
          fontSize: "14px",
          fontFamily: "inherit",
        },
      },
    },
    {
      opposite: true,
      labels: {
        style: {
          colors: "hsl(var(--nextui-default-800))",
          fontSize: "12px",
          fontFamily: "inherit",
        },
        formatter: (value) => `${value} Bar`,
      },
      title: {
        text: "Air Pressure (Bar)",
        style: {
          color: "hsl(var(--nextui-default-800))",
          fontSize: "14px",
          fontFamily: "inherit",
        },
      },
    },
  ],
  tooltip: {
    enabled: true,
    shared: true,
    followCursor: true,
    intersect: false,
    theme: "dark",
    x: {
      show: true,
    },
    y: {
      formatter: (value, { series, seriesIndex }) => {
        const labels = seriesIndex === 0 ? " mA" : " Bar";
        return `${value}${labels}`;
      },
    },
    marker: {
      show: true,
    },
  },
  grid: {
    borderColor: "hsl(var(--nextui-default-200))",
    strokeDashArray: 4,
    padding: {
      right: 30,
      left: 20,
    },
  },
  stroke: {
    curve: "smooth",
    width: 3,
    colors: ["hsl(220, 90%, 60%)", "hsl(120, 70%, 50%)"], // Different colors for different lines
  },
  markers: {
    size: 5,
    colors: ["hsl(220, 90%, 60%)", "hsl(120, 70%, 50%)"],
    strokeColors: "hsl(var(--nextui-background))",
    strokeWidth: 2,
    hover: {
      size: 7,
    },
  },
  annotations: {
    yaxis: [
      {
        y: 3,
        yAxisIndex: 1,
        borderColor: "hsl(0, 100%, 50%)",
        strokeDashArray: 3,
        label: {
          borderColor: "hsl(0, 100%, 50%)",
          style: {
            color: "#fff",
            background: "hsl(0, 100%, 50%)",
          },
          text: "3 Bar",
        },
      },
      {
        y: 150,
        yAxisIndex: 0,
        borderColor: "hsl(0, 100%, 50%)",
        strokeDashArray: 3,
        label: {
          borderColor: "hsl(0, 100%, 50%)",
          style: {
            color: "#fff",
            background: "hsl(0, 100%, 50%)",
          },
          text: "150 mA",
        },
      },
    ],
  },
};

export const Steam: React.FC<SteamProps> = ({ chartData }) => {
  const series = [
    {
      name: "Current",
      data: chartData.Current,
    },
    {
      name: "Pressure",
      data: chartData.Pressure,
    },
  ];

  return (
    <Chart
      options={{ ...chartOptions, xaxis: { categories: chartData.TimeChart } }}
      series={series}
      type="line"
      height={500}
    />
  );
};