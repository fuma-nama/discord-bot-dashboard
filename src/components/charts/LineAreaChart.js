import React from "react";

class LineChart extends React.Component {
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
          type='area'
          width='100%'
          height='100%'
        />
      </React.Suspense>
    );
  }
}

export default LineChart;
