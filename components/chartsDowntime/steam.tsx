import React from "react";
import Chart, { Props } from "react-apexcharts";

export const Steam = ({ downtimeData }: { downtimeData: any }) => {
  const seriesData = downtimeData ? downtimeData.dataMinutes : [];
  const categories = downtimeData ? downtimeData.date : [];
  const formattedData = downtimeData ? downtimeData.data : [];

  const chartOptions: Props["options"] = {
    chart: {
      type: "bar",
      animations: {
        easing: "easeinout",
        speed: 800,
      },
      background: "transparent",
      foreColor: "hsl(var(--nextui-default-800))",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "hsl(var(--nextui-default-800))",
          fontSize: "12px",
          fontFamily: "inherit",
        },
      },
    },
    yaxis: {
      title: {
        text: "Downtime (Minutes)",
        style: {
          color: "hsl(var(--nextui-default-800))",
          fontSize: "14px",
          fontFamily: "inherit",
        },
      },
      labels: {
        style: {
          colors: "hsl(var(--nextui-default-800))",
          fontSize: "12px",
          fontFamily: "inherit",
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        return `
          <div class="apexcharts-tooltip-custom">
            <span>${categories[dataPointIndex]}</span><br />
            <span>Downtime: ${formattedData[dataPointIndex]}</span><br />
            <span>Minutes: ${seriesData[dataPointIndex].toFixed(2)}m</span>
          </div>
        `;
      },
      style: {
        fontSize: "14px",
        fontFamily: "inherit",
      },
      marker: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        colors: {
          ranges: [
            {
              from: 120,
              to: Number.MAX_VALUE,
              color: "#FF0000", // Red color for values greater than 2 hours
            },
            {
              from: 60,
              to: 119,
              color: "#D8B632", // Yellow color for values between 1 and 2 hours
            },
            {
              from: 0,
              to: 59,
              color: "#1e81b0", // Blue color for values less than 1 hour
            },
          ],
          backgroundBarColors: [],
        },
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${(val as number).toFixed(2)}m`,
      style: {
        colors: ["hsl(var(--nextui-default-800))"],
        fontSize: "12px",
        fontFamily: "inherit",
      },
    },
    grid: {
      borderColor: "hsl(var(--nextui-default-800))",
      strokeDashArray: 4,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 350,
          },
          xaxis: {
            labels: {
              rotate: -45,
            },
          },
        },
      },
    ],
  };

  return (
    <div className="w-full z-20">
      <div id="chart">
        <Chart
          options={chartOptions}
          series={[{ name: "Downtime", data: seriesData }]}
          type="bar"
          height={425}
        />
      </div>
      <style jsx global>{`
        .apexcharts-toolbar {
          background-color: #333333 !important;
          border-radius: 4px !important;
        }
        .apexcharts-toolbar button {
          color: #ffffff !important;
          background-color: #333333 !important;
          border: none !important;
        }
        .apexcharts-toolbar button:hover {
          background-color: #555555 !important;
        }
        .apexcharts-menu {
          background-color: #333333 !important;
          border: 1px solid #555555 !important;
        }
        .apexcharts-menu-item {
          color: #ffffff !important;
        }
        .apexcharts-menu-item:hover {
          background-color: #555555 !important;
        }
        .apexcharts-tooltip-custom {
          background-color: black;
          color: white;
          padding: 8px;
          border-radius: 4px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};