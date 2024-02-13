import { Box, Typography } from "@mui/material";
import { months } from "./BroadHeatMap";
import React, { useEffect, useState } from 'react';
import Heatmap from 'react-heatmap-grid';
import CircularProgress from '@mui/material/CircularProgress';

const xLabels = months;
// const verticalLine = [
//     'Nifty Auto', 'Nifty Bank', 'Nifty Fin Service', 'NIFTY FINSRV25 50', 'Nifty Financial Services Ex-Bank', 'Nifty FMCG',
//     'NIFTY HEALTHCARE', 'Nifty IT', 'Nifty Pharma', 'Nifty Metal', 'Nifty Media', 'Nifty Pvt Bank', 'Nifty PSU Bank', 'Nifty Realty', 
//     'NIFTY CONSR DURBL', 'Nifty MidSmall Financial Services',  'Nifty MidSmall Healthcare', 'Nifty MidSmall IT & Telecom'
// ];
const SectorHeatMap = ({ isLoadingSectorHeatMap, setIsLoadingSectorHeatMap }) => {
    const [resultData, setResultData] = useState([]);

    const fetchData = async () => {
        setIsLoadingSectorHeatMap(true);
        try {
            const response = await fetch(`https://stock-api-0mm8.onrender.com/getsectorheatmapdata`);
            if (!response.ok) {
                throw new Error(`http error status:${response.status}`);
            }
            const result = await response.json();
            // console.log(result.data);
            setResultData(result.data);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setIsLoadingSectorHeatMap(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box>
            {
                isLoadingSectorHeatMap ? <Box sx={{ height: "30rem", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /> </Box> :
                    <Box>
                        <Typography sx={{ pl: 5, fontWeight: "bold", color: "blue" }}>Displaying All Sector Stocks</Typography>
                        <Heatmap
                            data={resultData.map((entry) => Object.values(entry).slice(1))}
                            xLabels={xLabels}
                            yLabels={resultData.map((entry) => entry.Stocks)}
                            height={20}
                            width={600}
                            backgroundColor="#eeeeee"
                            yLabelWidth={240}
                            yLabelTextAlign="left"
                            xLabelWidth={60}
                            cellStyle={(background, value, min, max, data, x, y) => ({
                                background: value < 0.50 ? `rgba(0, 128, 0, ${1 - (0.01 + (value - 0.01) / 0.49)})` : `rgba(255, 0, 0, ${1 - (max - value) / (max - 0.50)})`,
                                fontSize: '15px',
                                border: '1px solid #ffffff',
                                height: 60,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            })}
                            cellRender={(value) => value && `${value.toFixed(2)}`}
                        />
                    </Box>
            }
        </Box>
    )
}
export default SectorHeatMap;