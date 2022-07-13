import React from "react";

class PieChart extends React.Component {
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
          type='pie'
          width='100%'
          height='55%'
        />
      </React.Suspense>
    );
  }
}

export default PieChart;
