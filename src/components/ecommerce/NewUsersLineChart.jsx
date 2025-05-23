import React, { useMemo } from "react";
import Chart from "react-apexcharts";

export default function NewUsersLineChart({ newUsersPerDay }) {
  const { labels, counts } = useMemo(() => {
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split("T")[0];
      return {
        date: dateStr,
        count: newUsersPerDay[dateStr] || 0,
      };
    });

    return {
      labels: days.map((d) => d.date),
      counts: days.map((d) => d.count),
    };
  }, [newUsersPerDay]);

  const options = {
    chart: {
      type: "line",
      fontFamily: "Outfit, sans-serif",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#10B981"],
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: "#6B7280",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6B7280",
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} users`,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#E5E7EB",
    },
  };

  const series = [
    {
      name: "Users",
      data: counts,
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
        New Users Per Day
      </h3>
      <Chart options={options} series={series} type="line" height={300} />
    </div>
  );
}
