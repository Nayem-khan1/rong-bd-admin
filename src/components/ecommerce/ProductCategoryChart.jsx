import React from "react";
import Chart from "react-apexcharts";

export default function ProductCategoryChart({ categoryCount }) {
  const categories = Object.keys(categoryCount);
  const counts = Object.values(categoryCount);

  const options = {
    chart: {
      type: "donut",
      fontFamily: "Outfit, sans-serif",
    },
    labels: categories,
    colors: ["#FBBF24", "#34D399", "#60A5FA", "#F87171", "#A78BFA"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: '500'
      },
    },
    legend: {
      position: "bottom",
      fontSize: "14px",
      fontWeight: 500,
      labels: {
        colors: "#6B7280",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} Products`,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 320
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  const series = counts;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 mt-5 sm:mt-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
        Product Count by Category
      </h3>
      <Chart options={options} series={series} type="donut" height={300} />
    </div>
  );
}
