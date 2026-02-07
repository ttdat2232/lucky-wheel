import { useWheelSpin } from "@/components/wheel/useWheelSpin";
import { getFontSize, getSegmentAngle } from "@/components/wheel/wheelMath";
import { NameItem } from "@/types/nameItem";
import React from "react";

interface WheelProps {
  items: NameItem[];
  onSpinEnd: (item: NameItem) => void;
  isMuted: boolean;
  winningAudioUrl: string;
}

const Wheel: React.FC<WheelProps> = ({
  items,
  onSpinEnd,
  isMuted,
  winningAudioUrl,
}) => {
  const { rotation, isSpinning, spin } = useWheelSpin({
    items,
    isMuted,
    onSpinEnd,
    winningAudioUrl,
  });

  const total = items.length;
  const segmentAngle = getSegmentAngle(total || 1);
  const fontSize = getFontSize(total);

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto">
      {/* Pointer */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-40">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          style={{ rotate: "90deg" }}
        >
          <path
            d="M20 40 L5 10 L35 10 Z"
            fill="#ef4444"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Wheel */}
      <div className="w-full h-full p-2 rounded-full bg-white shadow-xl border-4">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full transition-transform duration-[4000ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {items.map((item, i) => {
            const start = i * segmentAngle - 90;
            const end = start + segmentAngle;

            const x1 = 50 + 50 * Math.cos((Math.PI * start) / 180);
            const y1 = 50 + 50 * Math.sin((Math.PI * start) / 180);
            const x2 = 50 + 50 * Math.cos((Math.PI * end) / 180);
            const y2 = 50 + 50 * Math.sin((Math.PI * end) / 180);

            return (
              <path
                key={item.id}
                d={`M50 50 L${x1} ${y1} A50 50 0 0 1 ${x2} ${y2} Z`}
                fill={item.color}
                stroke="#fff"
                strokeWidth="0.3"
              />
            );
          })}

          {items.map((item, i) => {
            const angle = i * segmentAngle + segmentAngle / 2 - 90;
            return (
              <g key={item.id} transform={`rotate(${angle} 50 50)`}>
                <text
                  x="94"
                  y="50"
                  textAnchor="end"
                  dominantBaseline="central"
                  fontSize={fontSize}
                  fill="white"
                  fontWeight="700"
                >
                  {item.text.length > 18
                    ? item.text.slice(0, 16) + ".."
                    : item.text}
                </text>
              </g>
            );
          })}

          <circle cx="50" cy="50" r="4.5" fill="#fff" />
          <circle cx="50" cy="50" r="3" fill="#1e293b" />
        </svg>
      </div>

      {/* Spin button */}
      <button
        onClick={spin}
        disabled={isSpinning || total === 0}
        className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600 text-white font-bold shadow-xl disabled:opacity-50"
      >
        QUAY
      </button>
    </div>
  );
};

export default Wheel;
