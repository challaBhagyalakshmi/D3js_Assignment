import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }
  drawChart() {
    const data = this.props.data;
    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (data, i) => i * 70)
      .attr("y", (data, i) => 300 - 10 * data)
      .attr("width", 65)
      .attr("height", (data, i) => data * 10)
      .attr("fill", "green");
    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((data) => data)
      .attr("x", (data, i) => i * 70)
      .attr("y", (data, i) => 300 - data * 10 - 3);
  }
  render() {
    return <div id={"#" + this.props.id}></div>;
  }
}

export default BarChart;
