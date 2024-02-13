import { Box, Typography } from "@mui/material";
import { months } from "./BroadHeatMap";
import React, { useEffect, useState } from 'react';
import Heatmap from 'react-heatmap-grid';
import CircularProgress from '@mui/material/CircularProgress';

const xLabels = months;
const StrategyHeatMap = ({ isLoadingStrategyHeatMap, setIsLoadingStrategyHeatMap }) => {
    const [resultData, setResultData] = useState([]);

    const fetchData = async () => {
        setIsLoadingStrategyHeatMap(true);
        try {
            const response = await fetch(`https://stock-api-0mm8.onrender.com/getstrategyheatmapdata`);
            if (!response.ok) {
                throw new Error(`http error status:${response.status}`);
            }
            const result = await response.json();
            // console.log(result.data);
            setResultData(result.data);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setIsLoadingStrategyHeatMap(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box>
            {
                isLoadingStrategyHeatMap ? <Box sx={{ height: "30rem", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /> </Box> :
                    <Box>
                        <Typography sx={{ pl: 5, fontWeight: "bold", color: "blue" }}>Displaying All Strategy Stocks</Typography>
                        <Heatmap
                            data={resultData.map((entry) => Object.values(entry).slice(1))}
                            xLabels={xLabels}
                            yLabels={resultData.map((entry) => entry.Stocks)}
                            height={20}
                            width={600}
                            yLabelWidth={350}
                            yLabelTextAlign="left"
                            backgroundColor="#eeeeee"
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
export default StrategyHeatMap;