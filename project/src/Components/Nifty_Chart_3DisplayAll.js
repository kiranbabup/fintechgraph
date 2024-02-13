import React, { Component } from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class Nifty_chart_3DA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ["tri__Nifty_50","tri__Nifty_Next_50","tri__Nifty_Midcap_50","tri__NIFTY_MIDCAP_100","tri__NIFTY_SMLCAP_50","tri__NIFTY_SMLCAP_100","Nifty_100","Nifty_200","NIFTY_MICROCAP_250","NIFTY_TOTAL_MARKET","tri__NIFTY_MIDCAP_150","tri__NIFTY_MIDSMALLCAP_400","tri__NIFTY_500","tri__NIFTY_SMALLCAP_250","tri__NIFTY_SMALLCAP_50","tri__NIFTY_LARGEMIDCAP_250","tri__NIFTY_SMALLCAP_100"],
      stockData:[],
    };
    // this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentDidMount(){
    this.fetchStockData();
  }

  async fetchStockData() {
    try {
      const response = await fetch("https://stock-api-0mm8.onrender.com/getstockdata");

      if(!response.ok){
        throw new Error (`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json();
      this.setState({ stockData: data.message });
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  }

   generateDataPoints(selectedOption) {
    const { stockData } = this.state;
    const dps = [];

    for (let i = 0; i < stockData.length; i++) {
      const dataPoint = {
        x: new Date(stockData[i].date),
        y: stockData[i][selectedOption],
      };
      dps.push(dataPoint);
    }

    return dps;
  }

  // handleDropdownChange(event) {
  //   this.setState({ selectedOption: event.target.value });
  // }

  render() {
    const {selectedOption} = this.state;
    const options = {
      title: {
        // text: "StockChart with Date Axis",
      },
      
      backgroundColor: "transparent", 
      animationEnabled: true,
      exportEnabled: true,
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        },
        valueFormatString: "DD/MM/YY",
      },
      axisY: {
        stripLines: [],
        ticks: {
          min: 0,
          stepSize: 5000
        },
        gridLines: {
          display: false
        },
        crosshair: {
          enabled: true
        }
      },
      charts: [{
        axisXType: "primary",
        axisYType: "primary",
        data: [
          {
            type: "spline",   
            name: "tri - Nifty 50",
            color: "green",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[0])
          },
          {
            type: "spline",
            name: "tri - Nifty Next 50",
            color: "blue",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[1])
          },
          {
            type: "spline",
            name: "tri - Nifty Midcap 50",
            color: "yellow",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[2])
          },
          {
            type: "spline",
            name: "tri - NIFTY MIDCAP 100",
            color: "orange",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[3])
          },
          {
            type: "spline",
            name: "tri - Nifty Next SMLCAP 50",
            color: "red",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[4])
          },
          {
            type: "spline",
            name: "tri - Nifty SMLCAP 100",
            color: "black",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[5])
          },
          {
            type: "spline",
            name: "Nifty 100",
            color: "brown",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[6])
          },
          {
            type: "spline",
            name: "Nifty 200",
            color: "pink",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[7])
          },
          {
            type: "spline",
            name: "NIFTY MICROCAP 250",
            color: "violet",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[8])
          },
          {
            type: "spline",
            name: "NIFTY TOTAL MARKET",
            color: "maroon",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[9])
          },
          {
            type: "spline",
            name: "tri - Nifty MIDCAP 150",
            color: "lime",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[10])
          },
          {
            type: "spline",
            name: "tri - Nifty MIDSMALLCAP 400",
            color: "gold",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[11])
          },
          {
            type: "spline",
            name: "tri - Nifty 500",
            color: "indigo",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[12])
          },
          {
            type: "spline",
            name: "tri - Nifty SMALLCAP 250",
            color: "cyan",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[13])
          },
          {
            type: "spline",
            name: "tri - Nifty SMALLCAP 50",
            color: "purple",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[14])
          },
          {
            type: "spline",
            name: "tri - Nifty LARGEMIDCAP 250",
            color: "gray",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[15])
          },
          {
            type: "spline",
            name: "tri - Nifty SMALLCAP 100",
            color: "teal",
            toolTipContent: "{name}: {x}: {y}",
            dataPoints: this.generateDataPoints(selectedOption[16])
          }
        ],
      }],
    };

    const mainDivStyle = {
      // background:"linear-gradient(to bottom right,#1F2133, #2B2D3E, #323548)",
      background:'white',
      fontWeight:'bold',
   }

    const containerStyle = {
      width: "100%",
      height: "450px",
      margin: "auto",
      marginBottom:'200px',
      // background: "linear-gradient(to bottom right,#1F2133, #2B2D3E, #323548)",
    };

    // const selectStyle = {
    //   outline:'none',
    //   margin:'10px 0px',
    //   height:'25px'
    // }
    return (
      <div style={mainDivStyle}>
        {/* <div >
          <label>Select Stock: </label>
          <select value={selectedOption} onChange={this.handleDropdownChange} style={selectStyle}>
            <option value="tri__Nifty_50" key="tri__Nifty_50">tri - Nifty 50</option>
            <option value="tri__Nifty_Next_50" key="tri__Nifty_Next_50">tri - Nifty Next 50</option>
            <option value="tri__Nifty_Midcap_50" key="tri__Nifty_Midcap_50">tri - Nifty Midcap 50</option>
            <option value="tri__NIFTY_MIDCAP_100" key="tri__NIFTY_MIDCAP_100">tri - NIFTY MIDCAP 100</option>
            <option value="tri__NIFTY_SMLCAP_50" key="tri__NIFTY_SMLCAP_50">tri - NIFTY SMLCAP 50</option>
            <option value="tri__NIFTY_SMLCAP_100" key="tri__NIFTY_SMLCAP_100">tri - NIFTY SMLCAP 100</option>
            <option value="Nifty_100" key="Nifty_100">Nifty 100</option>
            <option value="Nifty_200" key="Nifty_200">Nifty 200</option>
            <option value="NIFTY_MICROCAP_250" key="NIFTY_MICROCAP_250">NIFTY MICROCAP 250</option>
            <option value="NIFTY_TOTAL_MARKET" key="NIFTY_TOTAL_MARKET">NIFTY TOTAL MARKET</option>
            <option value="tri__NIFTY_MIDCAP_150" key="tri__NIFTY_MIDCAP_150">tri - NIFTY MIDCAP 150</option>
            <option value="tri__NIFTY_MIDSMALLCAP_400" key="tri__NIFTY_MIDSMALLCAP_400">tri - NIFTY MIDSMALLCAP 400</option>
            <option value="tri__NIFTY_500" key="tri__NIFTY_500">tri - NIFTY 500</option>
            <option value="tri__NIFTY_SMALLCAP_250" key="tri__NIFTY_SMALLCAP_250">tri - NIFTY SMALLCAP 250</option>
            <option value="tri__NIFTY_SMALLCAP_50" key="tri__NIFTY_SMALLCAP_50">tri - NIFTY SMALLCAP 50</option>
            <option value="tri__NIFTY_LARGEMIDCAP_250"  key="tri__NIFTY_LARGEMIDCAP_250">tri - NIFTY LARGEMIDCAP 250</option>
            <option value="tri__NIFTY_SMALLCAP_100" key="tri__NIFTY_SMALLCAP_100">tri - NIFTY SMALLCAP 100</option>

          </select>
        </div> */}
        <div style={containerStyle}>
          <CanvasJSStockChart options={options}/>
        </div>
      </div>
    );
  }
}

export default Nifty_chart_3DA;
