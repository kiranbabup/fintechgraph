import React, { Component } from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class Nifty_chart_2 extends Component {
  constructor(props) {
    super(props);
    this.generateDataPoints = this.generateDataPoints.bind(this);
  }

  generateDataPoints(noOfDps) {
    var xVal = 1, yVal1 = 10, yVal2 = 20; // Initial y-axis values
    var dps = [];
    for(var i = 0; i < noOfDps; i++) {
      yVal1 = yVal1 +  Math.round(5 + Math.random() *(-5-5));
      yVal2 = yVal2 +  Math.round(5 + Math.random() *(-5-5));
      dps.push({x: xVal, y1: yVal1, y2: yVal2});  
      xVal++;
    }
    return dps;
  }
  
  render() {

    const options = {
      title: {
        text: "StockChart with Numeric Axis",
        fontColor: "darkblue",
        fontSize: 20,
        fontFamily: "Arial, sans-serif"
      },
      backgroundColor: "#F5DEB3",
      animationEnabled: true,
      exportEnabled: true,
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        },
        title: "X-Axis Title",
        titleFontColor: "green",
        titleFontSize: 14,
        titleFontFamily: "Arial, sans-serif"
      },
      axisY: {
        stripLines: [
          {
            startValue: -200,
            endValue: -400,
            backgroundColor: "lightgray"
          },
          {
            startValue: -200,
            endValue: 0,
            color: "yellow",
            backgroundColor: "orange" 
          },
          {
            startValue: 0,
            endValue: 200,
            color: "orange",
            backgroundColor: "purple" 
          },
          {
            startValue: 200,
            endValue: 400,
            color: "red"
          }
        ],
      },
      axisY2: {
        stripLines: [
          {
            startValue: -Infinity,
            endValue: -200,
            color: "rgba(255, 255, 255, 0.5)", // Light background color for the section below -200
          },
          {
            startValue: -200,
            endValue: 0,
            color: "rgba(255, 255, 255, 0.3)", // Light background color for the section between -200 to 0
          },
          {
            startValue: 0,
            endValue: 200,
            color: "rgba(255, 255, 255, 0.5)", // Light background color for the section between 0 to 200
          },
          {
            startValue: 200,
            endValue: Infinity,
            color: "rgba(255, 255, 255, 0.3)", // Light background color for the section above 200
          },
        ],
      },
      charts: [{
        axisXType: "primary",
        axisYType: "primary",
        data: [
          {
            type: "spline",
            name: "Nifty Line 1",
            color: "royalblue",
            showInLegend: true,
            legendText: "Nifty Line 1",
            dataPoints: this.generateDataPoints(10000).map(point => ({ x: point.x, y: point.y1 }))
          },
          {
            type: "spline",
            name: "Nifty Line 2",
            color: "lightcoral",
            showInLegend: true,
            legendText: "Nifty Line 2",
            dataPoints: this.generateDataPoints(10000).map(point => ({ x: point.x, y: point.y2 }))
          }
        ]
      }],
      rangeSelector: {
        inputFields: {
          startValue: 4000,
          endValue: 6000,
          valueFormatString: "###0"
        },
        buttons: [{
          label: "1000",
          range: 1000,
          rangeType: "number"
        },{
          label: "2000",
          range: 2000,
          rangeType: "number"
        },{
          label: "5000",
          range: 5000,
          rangeType: "number"
        },{
          label: "All",        
          rangeType: "all"
        }]
      }
    };

    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
    };

    return (
      <div>
        <div>
          <CanvasJSStockChart containerProps={containerProps} options={options} />
        </div>
      </div>
    );
  }
}

export default Nifty_chart_2;
