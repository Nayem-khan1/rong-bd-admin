import React from "react";
import Chart from "react-apexcharts";

const OrdersByStatusChart = ({ data }) => {
  const labels = data.ordersByStatus.map((item) => item._id);
  const series = data.ordersByStatus.map((item) => item.count);

  const chartOptions = {
    chart: {
      type: "donut",
      id: "chartTwo", // Important for scoped styles
      fontFamily: "inherit",
    },
    labels,
    colors: ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA"],
    legend: {
      position: "bottom",
      fontSize: "14px",
      fontFamily: "inherit",
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} orders`,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 320,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <ChartCard title="Orders by Status">
      <div id="chartTwo" className="w-full">
        <Chart
          options={chartOptions}
          series={series}
          type="donut"
          height={300}
        />
      </div>
    </ChartCard>
  );
};

const ChartCard = ({ title, children }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">{title}</h3>
    <div className="h-80 flex justify-center items-center">{children}</div>
  </div>
);

export default OrdersByStatusChart;
