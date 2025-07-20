import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ZoomImg({ style, src, id }) {
  const [isHovering, setIsHovering] = useState(false);
  const [origin, setOrigin] = useState("center");
  const [scale, setScale] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchScale, setTouchScale] = useState(1);
  const [touchOrigin, setTouchOrigin] = useState({ x: 0.5, y: 0.5 });
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });
  const lastTouch = useRef(null);

  // Mouse zoom (desktop)
  const handleMouseMove = (e) => {
    setIsHovering(true);
    setScale(2);
    const container = e.currentTarget;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setOrigin(`${x}% ${y}%`);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
    setScale(1);
    setOrigin("center");
  };

  // Touch pinch-to-zoom (mobile)
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const [t1, t2] = e.touches;
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      setTouchStart({
        distance: Math.sqrt(dx * dx + dy * dy),
        scale: touchScale,
        origin: {
          x: (t1.clientX + t2.clientX) / 2,
          y: (t1.clientY + t2.clientY) / 2,
        },
        offset: { ...touchOffset },
      });
    } else if (e.touches.length === 1) {
      lastTouch.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        offset: { ...touchOffset },
      };
    }
  };
  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && touchStart) {
      const [t1, t2] = e.touches;
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      const newDistance = Math.sqrt(dx * dx + dy * dy);
      let newScale = Math.max(
        1,
        Math.min(3, (newDistance / touchStart.distance) * touchStart.scale)
      );
      setTouchScale(newScale);
      // Pan origin
      const container = e.currentTarget;
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = ((touchStart.origin.x - left) / width) * 100;
      const y = ((touchStart.origin.y - top) / height) * 100;
      setOrigin(`${x}% ${y}%`);
    } else if (e.touches.length === 1 && lastTouch.current) {
      // Pan
      const dx = e.touches[0].clientX - lastTouch.current.x;
      const dy = e.touches[0].clientY - lastTouch.current.y;
      setTouchOffset({
        x: lastTouch.current.offset.x + dx,
        y: lastTouch.current.offset.y + dy,
      });
    }
  };
  const handleTouchEnd = (e) => {
    if (e.touches.length === 0) {
      setTouchStart(null);
      lastTouch.current = null;
    }
  };

  // Compose transform for touch
  const touchTransform = `scale(${touchScale}) translate(${touchOffset.x}px, ${touchOffset.y}px)`;

  return (
    <div
      key={id}
      style={style}
      className="w-full max-w-md h-96 overflow-hidden rounded-2xl border-2 border-blue-200 shadow-xl relative bg-black flex items-center justify-center group select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="w-full h-96"
        style={
          touchStart || touchScale > 1
            ? {
                width: "100%",
                height: "100%",
                transition:
                  "transform 0.3s cubic-bezier(.4,2,.6,1), object-fit 0.3s",
                transform: touchTransform,
                transformOrigin: origin,
              }
            : {
                width: "100%",
                height: "100%",
                transition:
                  "transform 0.5s cubic-bezier(.4,2,.6,1), object-fit 0.3s",
                transform: `scale(${scale})`,
                transformOrigin: origin,
              }
        }
      >
        <img
          unoptimized="true"
          src={src}
          alt="Product image"
          fill="true"
          className={`w-full h-96 rounded-2xl ${
            isHovering || touchScale > 1 ? "object-contain" : "object-cover"
          } transition-all duration-300`}
          sizes="(max-width: 768px) 100vw, 400px"
          priority="true"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
