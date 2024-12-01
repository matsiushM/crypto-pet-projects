import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

import { ChartData } from "shared/types/chartData.ts";

interface Props {
    prices: ChartData[];
}

const LINE_COLOR = '#4CAF50';

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

        const scaleX = width / (prices.length - 1);
        const scaleY = height / (maxDataValue - minDataValue);

        drawBackground(context, prices, scaleX, height, width);

        drawChartLine(context, prices, scaleX, height, minDataValue, scaleY);

        drawAxes(context, width, height);
        drawLabels(context, prices, minDataValue, scaleY, height);
    }, [prices]);

    const drawBackground = (context: CanvasRenderingContext2D, prices: ChartData[], scaleX: number, height: number, width: number) => {
        const gradient = context.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#f0f0f0');
        gradient.addColorStop(1, '#ffffff');
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);

        context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        context.lineWidth = 0.8;
        context.setLineDash([5, 5]);

        prices.forEach((_, i) => {
            context.beginPath();
            const x = i * scaleX;
            context.moveTo(x, 0);
            context.lineTo(x, height);
            context.stroke();
        });
    }

    const drawChartLine = (context: CanvasRenderingContext2D, prices: ChartData[], scaleX: number, height: number, minDataValue: number, scaleY: number) => {
        context.beginPath();
        context.moveTo(0, height - (parseFloat(prices[0].priceUsd) - minDataValue) * scaleY);

        prices.forEach((value: ChartData, index: number) => {
            const price = parseFloat(value.priceUsd);
            context.lineTo(index * scaleX, height - (price - minDataValue) * scaleY);
        });

        context.strokeStyle = LINE_COLOR;
        context.lineWidth = 3;
        context.lineJoin = 'round';
        context.stroke();
    }

    const drawAxes = (context: CanvasRenderingContext2D, width: number, height: number) => {
        context.strokeStyle = '#000';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(0, height);
        context.lineTo(width, height);
        context.moveTo(0, 0);
        context.lineTo(0, height);
        context.stroke();
    }

    const drawLabels = (context: CanvasRenderingContext2D, prices: ChartData[], minDataValue: number, scaleY: number, height: number) => {
        const labelInterval = 10;
        const maxDataValue = Math.max(...prices.map((item: ChartData) => parseFloat(item.priceUsd)));
        const priceStep = (maxDataValue - minDataValue) / labelInterval;

        for (let i = 0; i <= labelInterval; i++) {
            const price = minDataValue + priceStep * i;
            const y = height - (price - minDataValue) * scaleY;

            context.fillStyle = '#000';
            context.font = '12px Arial';
            context.fillText(`$${price.toFixed(2)}`, 5, y - 5);
        }
    }

    return (
        <Box sx={{ m: 1 }}>
            <canvas ref={canvasRef} style={{ width: "100%" }} />
        </Box>
    );
};
