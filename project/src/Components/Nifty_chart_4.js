import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-stockcharts";
import { Alert, Box, Button, Snackbar } from "@mui/material";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
const CanvasJSStockChart2 = CanvasJSReact.CanvasJSStockChart;

const Nifty_chart_4 = () => {
  const [selectedOption, setSelectedOption] = useState(["tri__Nifty_50"]);
  const [stockData, setStockData] = useState([]);
  const [isView, setIsView] = useState(true);
  const [isCompare, setIsCompare] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarPosition, setSnackbarPosition] = useState({ vertical: "top", horizontal: "center" });

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await fetch("https://stock-api-0mm8.onrender.com/getstockdata");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setStockData(data.message);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const generateDataPoints = () => {
    const dataSeries = [];
    for (let i = 0; i < selectedOption.length; i++) {
      const dps = [];
      for (let j = 0; j < stockData.length; j++) {
        const dataPoint = {
          x: new Date(stockData[j].date),
          y: stockData[j][selectedOption[i]],
        };
        dps.push(dataPoint);
      }
      dataSeries.push({
        type: "spline",
        name: selectedOption[i].replace(/tri__|_/g, " "),
        color: getRandomColor(),
        toolTipContent: "{name}: {x}: {y}",
        dataPoints: dps,
      });
    }
    return dataSeries;
  };

  const generateDataPoints2 = () => {
    const dataSeries = [];
  
    // Find the minimum starting value among selected options
    let minStartingValue = Number.MAX_VALUE;
    for (let i = 0; i < selectedOption.length; i++) {
      const startingValue = stockData.length > 0 ? stockData[0][selectedOption[i]] : 0;
      minStartingValue = Math.min(minStartingValue, startingValue);
    }
  
    for (let i = 0; i < selectedOption.length; i++) {
      const dps = [];
      for (let j = 0; j < stockData.length; j++) {
        const percentageValue = ((stockData[j][selectedOption[i]] - minStartingValue) / minStartingValue) * 100;
        const dataPoint = {
          x: new Date(stockData[j].date),
          y: Math.abs(percentageValue), // Ensure values are positive
        };
        dps.push(dataPoint);
      }
      dataSeries.push({
        type: "spline",
        name: selectedOption[i].replace(/tri__|_/g, " "),
        color: getRandomColor(),
        toolTipContent: "{name}: {x}: {y}%",
        dataPoints: dps,
      });
    }
  
    return dataSeries;
  };
  
  
  
  
  
  const handleDropdownChange = (event) => {
    const { target: { value } } = event;
    if (value.length <= 5) {
        setSelectedOption(typeof value === "string" ? value.split(",") : value);
    }else{
        setSnackbarMessage("User can only select upto 5 stocks");
      setOpenSnackbar(true);
    }
    setIsView(false);
    setIsCompare(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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
        snapToDataPoint: true,
      },
      valueFormatString: "DD/MM/YY",
    },
    axisY: {
      stripLines: [],
      ticks: {
        min: 0,
        stepSize: 5000,
      },
      gridLines: {
        display: false,
      },
      crosshair: {
        enabled: true,
      },
    },
    charts: [
      {
        axisXType: "primary",
        axisYType: "primary",
        data: generateDataPoints(),
      },
    ],
  };

  const options2 = {
    title: {
      // text: "StockChart with Date Axis",
    },
    backgroundColor: "transparent",
    animationEnabled: true,
    exportEnabled: true,
    axisX: {
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
      valueFormatString: "DD/MM/YY",
    },
    axisY: {
      stripLines: [],
      ticks: {
        min: 0,
        stepSize: 5000,
      },
      gridLines: {
        display: false,
      },
      crosshair: {
        enabled: true,
      },
    },
    charts: [
      {
        axisXType: "primary",
        axisYType: "primary",
        data: generateDataPoints2(),
      },
    ],
  };

  const mainDivStyle = {
    background: "lightGray",
    fontWeight: "bold",
  };

  const containerStyle = {
    width: "100%",
    height: "auto",
    margin: "auto",
    marginBottom: "200px",
  };

  const onViewClick=()=>{
    setIsView(true);
    setIsCompare(false);
  }

  const onCompareClick=()=>{
    setIsView(false);
    setIsCompare(true);

  }
  return (
    <div style={mainDivStyle}>
      <Box sx={{ display: "flex", gap: "1rem", height: "4rem", alignItems: "center" }}>
        <NiftySelector handleDropdownChange={handleDropdownChange} selectedOption={selectedOption} />
        <Button variant="contained" onClick={()=>onViewClick()}>View</Button>
        <Button variant="contained" color="success" onClick={()=>onCompareClick()}>Compare</Button>
      </Box>

      <div style={containerStyle}>
        {isView && <CanvasJSStockChart options={options} /> }
        {isCompare && <CanvasJSStockChart2 options={options2} /> }
      </div>

      <Snackbar
        anchorOrigin={snackbarPosition}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default Nifty_chart_4;
