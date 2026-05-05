"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface DotPatternProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  glowColor?: string;
  proximity?: number;
  glowIntensity?: number;
  waveSpeed?: number;
  className?: string;
  children?: React.ReactNode;
}

export const DotPattern: React.FC<DotPatternProps> = ({
  dotSize = 1.2,
  gap = 20,
  baseColor = "#3f3f46", // zinc-600
  glowColor = "#22d3ee", // cyan-400
  proximity = 120,
  glowIntensity = 1,
  waveSpeed = 0.002,
  className,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rows = Math.ceil(canvas.height / gap);
      const cols = Math.ceil(canvas.width / gap);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * gap + gap / 2;
          const y = i * gap + gap / 2;

          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Calculate spotlight effect
          let glow = 0;
          if (distance < proximity) {
            glow = (1 - distance / proximity) * glowIntensity;
          }

          // Calculate wave effect
          const wave = Math.sin(x * 0.01 + y * 0.01 + time * waveSpeed * 10) * 0.5 + 0.5;
          const ambientScale = 0.8 + wave * 0.2;
          
          const finalScale = ambientScale + glow * 0.5;
          const finalOpacity = 0.2 + glow * 0.8;

          ctx.beginPath();
          ctx.arc(x, y, dotSize * finalScale, 0, Math.PI * 2);
          
          if (glow > 0) {
            ctx.fillStyle = glowColor;
            ctx.globalAlpha = finalOpacity;
          } else {
            ctx.fillStyle = baseColor;
            ctx.globalAlpha = finalOpacity * 0.5;
          }
          
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouse, dotSize, gap, baseColor, glowColor, proximity, glowIntensity, waveSpeed]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMouse({ x: -1000, y: -1000 });
  };

  return (
    <div 
      className={cn("relative h-full w-full overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.4)_100%)]" />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};
