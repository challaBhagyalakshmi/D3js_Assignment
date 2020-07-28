import React, { Component } from "react";
import * as d3 from "d3";

class Dataprep extends Component {
  componentDidMount() {}
  genType(d) {
    d.TIMESTAMP = parseDate(d.date);
    d.low = +d.low;
    d.high = +d.high;
    d.open = +d.open;
    d.close = +d.close;
    return d;
  }

  timeCompare(date, interval) {
    if (interval == "week") {
      const timeinterval = d3.time.monday(date);
    } else if (interval == "month") {
      const timeinterval = d3.time.month(date);
    } else {
      const timeinterval = d3.time.day(date);
    }
    return timeinterval;
  }

  dataCompress(data, interval) {
    const compressedData = d3
      .nest()
      .key(function (data) {
        return timeCompare(data.TIMESTAMP, interval);
      })
      .rollup(function (v) {
        return {
          TIMESTAMP: timeCompare(d3.values(v).pop().TIMESTAMP, interval),
          open: d3.values(v).shift().open,
          low: d3.min(v, function (d) {
            return data.low;
          }),
          high: d3.max(v, function (d) {
            return d.high;
          }),
          close: d3.values(v).pop().close,
        };
      })
      .entries(data)
      .map(function (d) {
        return d.values;
      });

    return compressedData;
  }
}
