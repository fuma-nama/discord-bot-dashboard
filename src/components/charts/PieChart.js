import React from "react";
import ReactApexChart from "react-apexcharts";

export default function PieChart({chartData, chartOptions, ...options}) {
  return (
      <ReactApexChart
          options={chartOptions}
          series={chartData}
          type='pie'
          {...options}
      />
  );
}