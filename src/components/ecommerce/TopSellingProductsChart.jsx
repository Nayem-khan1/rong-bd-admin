import React from "react";
import Chart from "react-apexcharts";

export default function TopSellingProductsChart({ topSellingProducts }) {
  const labels = topSellingProducts.map((item) => item.name);
  const data = topSellingProducts.map((item) => item.sold);

  const options = {
    chart: { type: "bar", toolbar: { show: false }, fontFamily: "Outfit, sans-serif" },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 5,
        barHeight: "60%",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: labels,
      labels: { style: { colors: "#6B7280" } },
    },
    colors: ["#6366F1"],
    tooltip: {
      y: { formatter: (val) => `${val} sold` },
    },
  };

  const series = [{ name: "Units Sold", data }];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
        Top Selling Products
      </h3>
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
}
