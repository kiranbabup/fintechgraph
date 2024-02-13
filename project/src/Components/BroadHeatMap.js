import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import Heatmap from 'react-heatmap-grid';
import CircularProgress from '@mui/material/CircularProgress';

export const months = [
    'Jan_23', 'Feb_23', 'Mar_23', 'Apr_23', 'May_23', 'June_23',
    'July_23', 'Aug_23', 'Sep_23', 'Oct_23', 'Nov_23', 'Dec_23'
];
const xLabels = months;

const BroadHeatMap = ({ isLoadingBroadHeatMap, setIsLoadingBroadHeatMap }) => {
    const [resultData, setResultData] = useState([]);

    const fetchData = async () => {
        setIsLoadingBroadHeatMap(true);
        try {
            const response = await fetch(`https://stock-api-0mm8.onrender.com/getbroadheatmapdata`);
            if (!response.ok) {
                throw new Error(`http error status:${response.status}`);
            }
            const result = await response.json();
            // console.log(result.data);
            setResultData(result.data);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setIsLoadingBroadHeatMap(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box>
            {
                isLoadingBroadHeatMap ? <Box sx={{ height: "30rem", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /> </Box> :
                    <Box>
                        <Typography sx={{ pl: 5, fontWeight: "bold", color: "blue" }}>Displaying All Broad Stocks</Typography>
                        <Heatmap
                            data={resultData.map((entry) => Object.values(entry).slice(1))}
                            xLabels={xLabels}
                            yLabels={resultData.map((entry) => entry.Stocks)}
                            height={20}
                            width={600}
                            yLabelWidth={160}
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
export default BroadHeatMap;