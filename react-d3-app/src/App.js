import React, { Component } from "react";
import Bars from "../src/candle_stick_chart/bars";
import Chart from "../src/candle_stick_chart/candle_stick_chart";
import Dataprep from "../src/candle_stick_chart/Dataprep";
import Header from "../src/candle_stick_chart/Header";
import Main from "../src/candle_stick_chart/main";
import Linechart from '../src/linechart/linechart_stock'
import Main_line from '../src/linechart/main'

class App extends Component {
  render() {
    let ch = 1;
    return (
        <div>
            {(() => {
          switch (ch) {
            case 1:
              return (
                <div id="demobox">
                <div id="csbox">
                  <div id="option">
                    <button id="oneM">1M</button>
                    <button id="threeM">3M</button>
                    <button id="sixM">6M</button>
                    <button id="oneY">1Y</button>
                    <button id="twoM">2Y</button>
                    <button id="fourY">4Y</button>
                  </div>
                  <div id="infobar">
                    <div id="infodate" class="infohead"></div>
                    <div id="infoopen" class="infobox"></div>
                    <div id="infohigh" class="infobox"></div>
                    <div id="infolow" class="infobox"></div>
                    <div id="infoclose" class="infobox"></div>
                  </div>
                  <div id="chart1"></div>
                  </div>
                  </div>
                <div>
                  <Bars></Bars>
                  <Chart></Chart>
                  <Dataprep></Dataprep>
                  <Header></Header>
                  <Main></Main>
                </div>
              );
            case 2:
              return (
                <div>
                  <Linechart></Linechart>
                  <Main_line></Main_line>
                </div>
              )
                }
            })()}
        </div>
    );
  }
}

export default App;
