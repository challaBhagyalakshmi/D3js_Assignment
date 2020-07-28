import React from "react";
import * as d3 from "d3";

class Chart extends Component {
  componentDidMount() {
    this.cschart();
  }
  cschart() {
    var margin = { top: 0, right: 30, bottom: 40, left: 5 },
      width = 620,
      height = 300,
      Bheight = 460;

    function csrender(selection) {
      selection.each(function () {
        const interval = TIntervals[TPeriod];
        const minimal = d3.min(genData, function (d) {
          return d.low;
        });
        const maximal = d3.max(genData, function (d) {
          return d.high;
        });

        const extRight = width + margin.right;
        const x = d3.scale.ordinal().rangeBands([0, width]);
        const y = d3.scale.linear().rangeRound([height, 0]);
        const xAxis = d3.svg
          .axis()
          .scale(x)
          .tickFormat(d3.time.format(TFormat[interval]));
        const yAxis = d3.svg
          .axis()
          .scale(y)
          .ticks(Math.floor(height / 50));
        x.domain(
          genData.map(function (d) {
            return d.date;
          })
        );
        y.domain([minimal, maximal]).nice();
        const xtickdelta = Math.ceil(60 / (width / genData.length));
        xAxis.tickValues(
          x.domain().filter(function (d, i) {
            return !((i + Math.floor(xtickdelta / 2)) % xtickdelta);
          })
        );
        const barwidth = x.rangeBand();
        const candlewidth =
          Math.floor(d3.min([barwidth * 0.8, 13]) / 2) * 2 + 1;
        const delta = Math.round((barwidth - candlewidth) / 2);
        d3.select(this).select("svg").remove();
        const svg = d3
          .select(this)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", Bheight + margin.top + margin.bottom)
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );
        svg
          .append("g")
          .attr("class", "axis xaxis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis.orient("bottom").outerTickSize(0));
        svg
          .append("g")
          .attr("class", "axis yaxis")
          .attr("transform", "translate(" + width + ",0)")
          .call(yAxis.orient("right").tickSize(0));
        svg
          .append("g")
          .attr("class", "axis grid")
          .attr("transform", "translate(" + width + ",0)")
          .call(
            yAxis.orient("left").tickFormat("").tickSize(width).outerTickSize(0)
          );
        const bands = svg
          .selectAll(".bands")
          .data([genData])
          .enter()
          .append("g")
          .attr("class", "bands");
        bands
          .selectAll("rect")
          .data(function (d) {
            return d;
          })
          .enter()
          .append("rect")
          .attr("x", function (d) {
            return x(d.date);
          })
          .attr("y", 0)
          .attr("height", Bheight)
          .attr("width", 1)
          .attr("class", function (d, i) {
            return "band" + i;
          })
          .style("stroke-width", Math.floor(barwidth));
        const stick = svg
          .selectAll(".sticks")
          .data([genData])
          .enter()
          .append("g")
          .attr("class", "sticks");
        stick
          .selectAll("rect")
          .data(function (d) {
            return d;
          })
          .enter()
          .append("rect")
          .attr("x", function (d) {
            return x(d.date);
          })
          .attr("y", function (d) {
            return y(d.high);
          })
          .attr("class", function (d, i) {
            return "stick" + i;
          })
          .attr("height", function (d) {
            return y(d.low) - y(d.high);
          })
          .attr("width", 1)
          .classed("rise", function (d) {
            return d.close > d.open;
          })
          .classed("fall", function (d) {
            return d.open > d.close;
          });
        const candle = svg
          .selectAll(".candles")
          .data([genData])
          .enter()
          .append("g")
          .attr("class", "candles");
        candle
          .selectAll("rect")
          .data(function (d) {
            return d;
          })
          .enter()
          .append("rect")
          .attr("x", function (d) {
            return x(d.date) + delta;
          })
          .attr("y", function (d) {
            return y(d3.max([d.open, d.close]));
          })
          .attr("class", function (d, i) {
            return "candle" + i;
          })
          .attr("height", function (d) {
            return y(d3.min([d.open, d.close])) - y(d3.max([d.open, d.close]));
          })
          .attr("width", candlewidth)
          .classed("rise", function (d) {
            return d.close > d.open;
          })
          .classed("fall", function (d) {
            return d.open > d.close;
          });
      });
    }
    csrender.Bheight = function (value) {
      if (!arguments.length) return Bheight;
      Bheight = value;
      return csrender;
    };

    return csrender;
  }
  render() {
    return <div id={"#" + this.props.id}></div>;
  }
}

export default Chart;
