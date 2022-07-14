import React from "react";
import ReactApexChart from "react-apexcharts";

export default function PieChart({chartData, chartOptions}) {
  return (
      <ReactApexChart
          options={chartOptions}
          series={chartData}
          type='pie'
          width='100%'
          height='55%'
      />
  );
}