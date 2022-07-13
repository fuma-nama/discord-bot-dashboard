import React, { Component } from "react";

class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }

  render() {
    const ReactApexChart = React.lazy(() => import("react-apexcharts"))
    
    return (
      <React.Suspense fallback={<div/>}>
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type='bar'
          width='100%'
          height='100%'
        />
      </React.Suspense>
    );
  }
}

export default ColumnChart;
