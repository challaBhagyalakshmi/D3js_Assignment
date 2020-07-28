import React, { Component } from 'react';
import * as d3 from 'd3';

class Main_line extends Component{
  componentDidMount(){
  this.data_export();
  }
  render() {
    return(<div id={'#'+this.props.id}></div>)
  }
  data_export() {
    const parseDate = d3.time.format("%Y-%m-%d").parse;
    const TPeriod = "3M";
    const TDays = { "3M": 63, "6M": 126, "1Y": 252 };
    const TIntervals = {
      "3M": "day",
      "6M": "day",
      "1Y": "week"
    };
    const TFormat = { day: "%d %b '%y", week: "%d %b '%y", month: "%b '%y" };
    const genRaw, genData;
    data_export () {
        d3.csv("​https://drive.google.com/open?id=1XKBeiqvJTq3UzSZ3G3m1APdKbE_v9PBo", genType, function (data) {
        genRaw = data;
        this.mainjs();
    });
    })();
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
  }

  displayAll() {
    changeClass();
    displayCS();
    displayGen(genData.length - 1);
  }
  
  changeClass() {
    if (TPeriod == "3M") {
      d3.select("#threeM").classed("active", true);
      d3.select("#sixM").classed("active", false);
      d3.select("#oneY").classed("active", false);
    } else if (TPeriod == "6M") {
      d3.select("#threeM").classed("active", false);
      d3.select("#sixM").classed("active", true);
      d3.select("#oneY").classed("active", false);
    } else{
      d3.select("#threeM").classed("active", false);
      d3.select("#sixM").classed("active", false);
      d3.select("#oneY").classed("active", true);
    } 
  }
}

export default Main_line;


