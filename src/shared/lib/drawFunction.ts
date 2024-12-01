import {ChartData} from "shared/types/chartData.ts";

const LINE_COLOR = '#4CAF50';
const FON_COLOR_1 = '#f0f0f0'
const FON_COLOR_2 = '#ffffff'
const COLOR_AXES = '#000';

export const drawBackground = (context: CanvasRenderingContext2D, prices: ChartData[], scaleX: number, height: number, width: number) => {
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, FON_COLOR_1);
    gradient.addColorStop(1, FON_COLOR_2);
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

export const drawChartLine = (context: CanvasRenderingContext2D, prices: ChartData[], scaleX: number, height: number, minDataValue: number, scaleY: number) => {
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

export const drawAxes = (context: CanvasRenderingContext2D, width: number, height: number) => {
    context.strokeStyle = COLOR_AXES;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, height);
    context.lineTo(width, height);
    context.moveTo(0, 0);
    context.lineTo(0, height);
    context.stroke();
}

export const drawLabels = (context: CanvasRenderingContext2D, prices: ChartData[], minDataValue: number, scaleY: number, height: number) => {
    const labelInterval = 10;
    const maxDataValue = Math.max(...prices.map((item: ChartData) => parseFloat(item.priceUsd)));
    const priceStep = (maxDataValue - minDataValue) / labelInterval;

    for (let i = 0; i <= labelInterval; i++) {
        const price = minDataValue + priceStep * i;
        const y = height - (price - minDataValue) * scaleY;

        context.fillStyle = COLOR_AXES;
        context.font = '12px Arial';
        context.fillText(`$${price.toFixed(2)}`, 5, y - 5);
    }
}