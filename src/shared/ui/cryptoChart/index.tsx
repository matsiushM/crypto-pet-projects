import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

import { ChartData } from "shared/types/chartData";

interface Props {
    prices: ChartData[];
}

export const CryptoChart = ({ prices }: Props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = 500;

        const maxDataValue = Math.max(...prices.map((item: ChartData) => parseFloat(item.priceUsd)));
        const minDataValue = Math.min(...prices.map((item: ChartData) => parseFloat(item.priceUsd)));

        const scaleX = width / (prices.length - 1);
        const scaleY = height / (maxDataValue - minDataValue);

        const gradient = context.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#f0f0f0');
        gradient.addColorStop(1, '#ffffff');
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);

        context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        context.lineWidth = 0.5;
        context.setLineDash([5, 5]);

        for (let i = 0; i < 5; i++) {
            const y = height - ((maxDataValue - (maxDataValue / 5) * i - minDataValue) * scaleY);
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(width, y);
            context.stroke();
        }

        for (let i = 0; i < prices.length; i++) {
            const x = i * scaleX;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, height);
            context.stroke();
        }

        context.beginPath();
        context.moveTo(0, height - (parseFloat(prices[0].priceUsd) - minDataValue) * scaleY);

        prices.forEach((value: ChartData, index: number) => {
            const price = parseFloat(value.priceUsd);
            context.lineTo(index * scaleX, height - (price - minDataValue) * scaleY);
        });

        context.strokeStyle = '#4CAF50';
        context.lineWidth = 3;
        context.lineJoin = 'round';
        context.stroke();

        context.strokeStyle = '#000';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(0, height);
        context.lineTo(width, height);
        context.moveTo(0, 0);
        context.lineTo(0, height);
        context.stroke();

        const labelInterval = 10;
        const priceStep = (maxDataValue - minDataValue) / labelInterval;

        for (let i = 0; i <= labelInterval; i++) {
            const price = minDataValue + priceStep * i;
            const y = height - (price - minDataValue) * scaleY;

            context.fillStyle = '#000';
            context.font = '12px Arial';
            context.fillText(`$${price.toFixed(2)}`, 5, y-5);
        }

    }, [prices]);

    return (
        <Box sx={{ m: 1 }}>
            <canvas ref={canvasRef} style={{ width: "100%" }} />
        </Box>
    );
};
