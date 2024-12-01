import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import {drawAxes, drawBackground, drawChartLine, drawLabels} from "shared/lib/drawFunction";

import { ChartData } from "shared/types/chartData.ts";

interface Props {
    prices: ChartData[];
}

export const CryptoChart = ({ prices }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = 500;

        const maxDataValue = Math.max(...prices.map((item: ChartData) => parseFloat(item.priceUsd)));
        const minDataValue = Math.min(...prices.map((item: ChartData) => parseFloat(item.priceUsd)));

        if(isNaN(minDataValue) || isNaN(maxDataValue)) {
            return;
        }

        const scaleX = width / (prices.length - 1);
        const scaleY = height / (maxDataValue - minDataValue);

        drawBackground(context, prices, scaleX, height, width);

        drawChartLine(context, prices, scaleX, height, minDataValue, scaleY);

        drawAxes(context, width, height);
        drawLabels(context, minDataValue, maxDataValue, scaleY, height);
    }, [prices]);

    return (
        <Box sx={{ m: 1 }}>
            <canvas ref={canvasRef} style={{ width: "100%" }} />
        </Box>
    );
};
