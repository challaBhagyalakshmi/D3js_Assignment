import React, { Component } from 'react';
import * as d3 from 'd3';
import { min } from 'd3';

class Main extends Component{
  render() {
    const parseDate = d3.time.format("%Y-%m-%d").parse;
    const TPeriod = "3M";
    const TDays = { "1M": 21, "3M": 63, "6M": 126, "1Y": 252, "2Y": 504, "4Y": 1008 };
    const TIntervals = {
       "1M": "day",
       "3M": "day",
        "6M": "day",
       "1Y": "week",
        "2Y": "week",
      "4Y": "month",
    };
    const TFormat = { day: "%d %b '%y", week: "%d %b '%y", month: "%b '%y" };
    const genRaw, genData;
    return(<div id={'#'+this.props.id}></div>)
  }
  componentDidMount() {
    this.data_read();
  }
  data_read() {
    d3.csv("​https://drive.google.com/open?id=1XKBeiqvJTq3UzSZ3G3m1APdKbE_v9PBo", genType, function (data) {
    genRaw = data;
    mainjs();
  });
  }
  toSlice(data) {
    return data.slice(-TDays[TPeriod]);
  }
  mainjs() {
    const toPress = function () {
      genData =
        TIntervals[TPeriod] != "day"
          ? dataCompress(toSlice(genRaw), TIntervals[TPeriod])
          : toSlice(genRaw);
    };
    toPress();
    displayAll();
    d3.select("#oneM").on("click", function () {
      TPeriod = "1M";
      toPress();
      displayAll();
    });
    d3.select("#threeM").on("click", function () {
      TPeriod = "3M";
      toPress();
      displayAll();
    });
    d3.select("#sixM").on("click", function () {
      TPeriod = "6M";
      toPress();
      displayAll();
    });
    d3.select("#oneY").on("click", function () {
      TPeriod = "1Y";
      toPress();
      displayAll();
    });
    d3.select("#twoY").on("click", function () {
      TPeriod = "2Y";
      toPress();
      displayAll();
    });
    d3.select("#fourY").on("click", function () {
      TPeriod = "4Y";
      toPress();
      displayAll();
    });
  }
  displayAll() {
    changeClass();
    displayCS();
    displayGen(genData.length - 1);
  }
  changeClass() {
    if (TPeriod == "1M") {
      d3.select("#oneM").classed("active", true);
      d3.select("#threeM").classed("active", false);
      d3.select("#sixM").classed("active", false);
      d3.select("#oneY").classed("active", false);
      d3.select("#twoY").classed("active", false);
      d3.select("#fourY").classed("active", false);
    } else if (TPeriod == "6M") {
      d3.select("#oneM").classed("active", false);
      d3.select("#threeM").classed("active", false);
      d3.select("#sixM").classed("active", true);
      d3.select("#oneY").classed("active", false);
      d3.select("#twoY").classed("active", false);
      d3.select("#fourY").classed("active", false);
    } else if (TPeriod == "1Y") {
      d3.select("#oneM").classed("active", false);
      d3.select("#threeM").classed("active", false);
      d3.select("#sixM").classed("active", false);
      d3.select("#oneY").classed("active", true);
      d3.select("#twoY").classed("active", false);
      d3.select("#fourY").classed("active", false);
    } else if (TPeriod == "2Y") {
      d3.select("#oneM").classed("active", false);
      d3.select("#threeM").classed("active", false);
      d3.select("#sixM").classed("active", false);
      d3.select("#oneY").classed("active", false);
      d3.select("#twoY").classed("active", true);
      d3.select("#fourY").classed("active", false);
    } else if (TPeriod == "4Y") {
      d3.select("#oneM").classed("active", false);
      d3.select("#threeM").classed("active", false);
      d3.select("#sixM").classed("active", false);
      d3.select("#oneY").classed("active", false);
      d3.select("#twoY").classed("active", false);
      d3.select("#fourY").classed("active", true);
    } else {
      d3.select("#oneM").classed("active", false);
      d3.select("#threeM").classed("active", true);
      d3.select("#sixM").classed("active", false);
      d3.select("#oneY").classed("active", false);
      d3.select("#twoY").classed("active", false);
      d3.select("#fourY").classed("active", false);
    }
  }
  displayCS() {
    const chart = cschart().Bheight(460);
    d3.select("#chart1").call(chart);
    const chart = barchart().mname("volume").margin(320).MValue("volume");
    d3.select("#chart1").datum(genData).call(chart);
    hoverAll();
  }
  hoverAll() {
    d3.select("#chart1")
      .select(".bands")
      .selectAll("rect")
      .on("mouseover", function (d, i) {
        d3.select(this).classed("hoved", true);
        d3.select(".stick" + i).classed("hoved", true);
        d3.select(".candle" + i).classed("hoved", true);
        d3.select(".volume" + i).classed("hoved", true);
        d3.select(".sigma" + i).classed("hoved", true);
        displayGen(i);
      })
      .on("mouseout", function (d, i) {
        d3.select(this).classed("hoved", false);
        d3.select(".stick" + i).classed("hoved", false);
        d3.select(".candle" + i).classed("hoved", false);
        d3.select(".volume" + i).classed("hoved", false);
        d3.select(".sigma" + i).classed("hoved", false);
        displayGen(genData.length - 1);
      });
  }
  displayGen(mark) {
    const header = csheader();
    d3.select("#infobar").datum(genData.slice(mark)[0]).call(header);
  }
}

export default Main;