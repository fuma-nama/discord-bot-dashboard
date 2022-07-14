import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default function ColumnChart({chartData, chartOptions}) {
  return (
      <ReactApexChart
          options={chartOptions}
          series={chartData}
          type='bar'
          width='100%'
          height='100%'
      />
  );
}