"use client";

import { useEffect, useRef } from "react";

export function AreaChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw purple line (revenue)
    ctx.beginPath();
    ctx.moveTo(0, height * 0.7);
    ctx.bezierCurveTo(
      width * 0.2,
      height * 0.9,
      width * 0.3,
      height * 0.3,
      width * 0.5,
      height * 0.4
    );
    ctx.bezierCurveTo(
      width * 0.6,
      height * 0.45,
      width * 0.7,
      height * 0.1,
      width * 0.9,
      height * 0.3
    );
    ctx.lineTo(width, height * 0.3);

    // Create gradient for purple area
    const purpleGradient = ctx.createLinearGradient(0, 0, 0, height);
    purpleGradient.addColorStop(0, "rgba(139, 92, 246, 0.5)");
    purpleGradient.addColorStop(1, "rgba(139, 92, 246, 0)");

    // Fill purple area
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = purpleGradient;
    ctx.fill();

    // Draw purple line
    ctx.beginPath();
    ctx.moveTo(0, height * 0.7);
    ctx.bezierCurveTo(
      width * 0.2,
      height * 0.9,
      width * 0.3,
      height * 0.3,
      width * 0.5,
      height * 0.4
    );
    ctx.bezierCurveTo(
      width * 0.6,
      height * 0.45,
      width * 0.7,
      height * 0.1,
      width * 0.9,
      height * 0.3
    );
    ctx.lineTo(width, height * 0.3);
    ctx.strokeStyle = "#8b5cf6";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw blue line (expenses)
    ctx.beginPath();
    ctx.moveTo(0, height * 0.5);
    ctx.bezierCurveTo(
      width * 0.2,
      height * 0.3,
      width * 0.4,
      height * 0.6,
      width * 0.6,
      height * 0.8
    );
    ctx.bezierCurveTo(
      width * 0.7,
      height * 0.9,
      width * 0.8,
      height * 0.7,
      width,
      height * 0.5
    );

    // Create gradient for blue area
    const blueGradient = ctx.createLinearGradient(0, 0, 0, height);
    blueGradient.addColorStop(0, "rgba(6, 182, 212, 0.5)");
    blueGradient.addColorStop(1, "rgba(6, 182, 212, 0)");

    // Fill blue area
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = blueGradient;
    ctx.fill();

    // Draw blue line
    ctx.beginPath();
    ctx.moveTo(0, height * 0.5);
    ctx.bezierCurveTo(
      width * 0.2,
      height * 0.3,
      width * 0.4,
      height * 0.6,
      width * 0.6,
      height * 0.8
    );
    ctx.bezierCurveTo(
      width * 0.7,
      height * 0.9,
      width * 0.8,
      height * 0.7,
      width,
      height * 0.5
    );
    ctx.strokeStyle = "#06b6d4";
    ctx.lineWidth = 3;
    ctx.stroke();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={300}
      className="w-full h-full"
    />
  );
}

export function BarChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw bars
    const barCount = 24;
    const barWidth = (width / barCount) * 0.6;
    const barSpacing = (width / barCount) * 0.4;
    const maxBarHeight = height * 0.8;

    for (let i = 0; i < barCount; i++) {
      // Random height between 0.2 and 1 of maxBarHeight
      const randomHeight = Math.random() * 0.8 + 0.2;
      const barHeight = maxBarHeight * randomHeight;

      const x = i * (barWidth + barSpacing);
      const y = height - barHeight;

      // Create gradient for bar
      const gradient = ctx.createLinearGradient(0, y, 0, height);
      gradient.addColorStop(0, "#8b5cf6");
      gradient.addColorStop(1, "#4f46e5");

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={100}
      className="w-full h-full"
    />
  );
}

export function LineChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw line
    ctx.beginPath();
    ctx.moveTo(0, height * 0.7);
    ctx.lineTo(width * 0.1, height * 0.6);
    ctx.lineTo(width * 0.2, height * 0.5);
    ctx.lineTo(width * 0.3, height * 0.7);
    ctx.lineTo(width * 0.4, height * 0.4);
    ctx.lineTo(width * 0.5, height * 0.2);
    ctx.lineTo(width * 0.6, height * 0.5);
    ctx.lineTo(width * 0.7, height * 0.7);
    ctx.lineTo(width * 0.8, height * 0.6);
    ctx.lineTo(width * 0.9, height * 0.8);
    ctx.lineTo(width, height * 0.7);

    ctx.strokeStyle = "#8b5cf6";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw dots at data points
    const points = [
      { x: 0, y: height * 0.7 },
      { x: width * 0.1, y: height * 0.6 },
      { x: width * 0.2, y: height * 0.5 },
      { x: width * 0.3, y: height * 0.7 },
      { x: width * 0.4, y: height * 0.4 },
      { x: width * 0.5, y: height * 0.2 },
      { x: width * 0.6, y: height * 0.5 },
      { x: width * 0.7, y: height * 0.7 },
      { x: width * 0.8, y: height * 0.6 },
      { x: width * 0.9, y: height * 0.8 },
      { x: width, y: height * 0.7 },
    ];

    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#8b5cf6";
      ctx.fill();
    });

    // Draw x-axis labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";

    ctx.fillText("10 AM", 0, height - 5);
    ctx.fillText("3 AM", width * 0.33, height - 5);
    ctx.fillText("8 PM", width * 0.66, height - 5);
    ctx.fillText("1 PM", width, height - 5);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={100}
      className="w-full h-full"
    />
  );
}
