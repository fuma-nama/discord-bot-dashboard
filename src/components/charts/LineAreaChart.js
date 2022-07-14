import React from "react";
import ReactApexChart from "react-apexcharts";

export default function LineChart({chartData, chartOptions}) {
  return (
      <ReactApexChart
          options={chartOptions}
          series={chartData}
          type='area'
          width='100%'
          height='100%'
      />
  );
}