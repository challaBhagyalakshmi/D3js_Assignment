import React, { Component } from "react";
import * as d3 from "d3";


class Linechart extends Component {
  componentDidMount() {
    this.line_chart();
  }
  render() {
    return <div id={"#" + this.props.id}></div>;
  }
  line_chart() {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select("#my_ref")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    d3.csv(
      "https://drive.google.com/file/d/1XKBeiqvJTq3UzSZ3G3m1APdKbE_v9PBo/view",
      function (d) {
        return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.volume };
      },
      function (data) {
        const x = d3
          .scaleTime()
          .domain(
            d3.extent(data, chart(d) {
              return data.date;
            })
          )
          .range([0, width]);
        svg
          .append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
        const y = d3
          .scaleLinear()
          .domain([
            0,
            d3.max(data, function (d) {
              return +d.value;
            }),
          ])
          .range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));
        svg
          .append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr(
            "d",
            d3
              .line()
              .x(function (d) {
                return x(d.date);
              })
              .y(function (d) {
                return y(d.value);
              })
          );
      })
    }
}
  
export default Linechart;