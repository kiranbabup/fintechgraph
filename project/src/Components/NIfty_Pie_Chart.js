
import React, { Component } from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
 
class Nifty_Pie_Chart extends Component {
  constructor(props) {
    super(props);
    this.generateDataPoints = this.generateDataPoints.bind(this);
  }

  generateDataPoints(noOfDps) {
    var xVal = 1, yVal1 = 100, yVal2 = 120; // Separate y values for two lines
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
      title:{
        text:"StockChart with Numeric Axis"
      },
      backgroundColor: "#F5DEB3",
      animationEnabled: true,
      exportEnabled: true,
      charts: [{
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          }
        },
        axisY: {
          crosshair: {
            enabled: true,
          }
        },
        data: [
          {
            type: "spline",
            name: "Nifty Line 1",
            color: "red",
            showInLegend: true,
            legendText: "Nifty Line 1",
            dataPoints: this.generateDataPoints(10000).map(point => ({ x: point.x, y: point.y1 }))
          },
          {
            type: "spline",
            name: "Nifty Line 2",
            color: "lightcoral", // Adjust color for the second line
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
      margin: "auto"
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
 
export default Nifty_Pie_Chart;
