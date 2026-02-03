import React, { useCallback, useEffect, useRef, useState } from "react";
import { NameItem } from "../types";

interface WheelProps {
  items: NameItem[];
  onSpinEnd: (item: NameItem) => void;
  isSpinning: boolean;
  setIsSpinning: (val: boolean) => void;
  isMuted: boolean;
}

const SPIN_SOUND_URL =
  "https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3";

const Wheel: React.FC<WheelProps> = ({
  items,
  onSpinEnd,
  isSpinning,
  setIsSpinning,
  isMuted,
}) => {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<SVGSVGElement>(null);
  const spinAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    spinAudio.current = new Audio(SPIN_SOUND_URL);
    spinAudio.current.loop = true;
  }, []);

  const displayData = items.length > 0 ? items : [];

  const spin = useCallback(() => {
    if (isSpinning || displayData.length === 0) return;

    setIsSpinning(true);

    if (!isMuted && spinAudio.current) {
      spinAudio.current.currentTime = 0;
      spinAudio.current
        .play()
        .catch((e) => console.log("Audio play failed", e));
    }

    const extraDegrees = Math.random() * 360;
    const spinDegrees = 1800 + extraDegrees;
    const newRotation = rotation + spinDegrees;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      spinAudio.current?.pause();

      const segmentAngle = 360 / displayData.length;
      const pointerAngle = (360 - (newRotation % 360)) % 360;
      let winningIndex = Math.floor((pointerAngle + 0.0001) / segmentAngle);

      onSpinEnd(displayData[winningIndex]);
    }, 4500);
  }, [isSpinning, rotation, displayData, onSpinEnd, setIsSpinning, isMuted]);

  const total = displayData.length;
  const segmentAngle = 360 / (total || 1);

  let fontSize = 4.2;
  if (total > 10) fontSize = 3.2;
  if (total > 20) fontSize = 2.2;
  if (total > 30) fontSize = 1.6;

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-40 filter drop-shadow-lg">
        {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-40 filter drop-shadow-lg"> */}
        {/* <svg width="40" height="40" viewBox="0 0 40 40">
          <path
            d="M20 40 L5 10 L35 10 Z"
            fill="#ef4444"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg> */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          style={{ transform: "rotate(90deg)" }}
        >
          <path
            d="M20 40 L5 10 L35 10 Z"
            fill="#ef4444"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="w-full h-full p-2 rounded-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[6px] border-slate-100 overflow-hidden relative">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full transition-transform duration-[4000ms] cubic-bezier(0.1, 0, 0.1, 1)"
          style={{ transform: `rotate(${rotation}deg)` }}
          ref={wheelRef}
        >
          {total > 0 ? (
            <>
              <g>
                {displayData.map((item, i) => {
                  const startAngle = i * segmentAngle;
                  const endAngle = (i + 1) * segmentAngle;
                  const x1 =
                    50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                  const y1 =
                    50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                  const x2 =
                    50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
                  const y2 =
                    50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);
                  const largeArcFlag = segmentAngle > 180 ? 1 : 0;
                  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                  return (
                    <path
                      key={`path-${item.id}-${i}`}
                      d={pathData}
                      fill={item.color}
                      stroke="#ffffff"
                      strokeWidth="0.3"
                    />
                  );
                })}
              </g>

              <g>
                {displayData.map((item, i) => {
                  const midAngle = i * segmentAngle + segmentAngle / 2;
                  return (
                    <g
                      key={`text-group-${item.id}-${i}`}
                      transform={`rotate(${midAngle} 50 50)`}
                    >
                      <text
                        x="94"
                        y="50"
                        fill="white"
                        fontSize={fontSize}
                        fontWeight="700"
                        textAnchor="end"
                        dominantBaseline="central"
                        className="select-none pointer-events-none"
                        style={{
                          textShadow: "0px 1px 3px rgba(0,0,0,0.6)",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {item.text.length > 18
                          ? item.text.substring(0, 16) + ".."
                          : item.text}
                      </text>
                    </g>
                  );
                })}
              </g>
            </>
          ) : (
            <circle
              cx="50"
              cy="50"
              r="49"
              fill="#f1f5f9"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          )}

          <circle cx="50" cy="50" r="4.5" fill="#fff" />
          <circle cx="50" cy="50" r="3" fill="#1e293b" />
        </svg>
      </div>

      <button
        onClick={spin}
        disabled={isSpinning || items.length === 0}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-white shadow-2xl flex items-center justify-center font-bold text-white transition-all transform active:scale-95 z-50 ${
          isSpinning || items.length === 0
            ? "bg-slate-300 cursor-not-allowed opacity-60 shadow-none"
            : "bg-gradient-to-br from-indigo-500 to-indigo-700 hover:scale-110 cursor-pointer shadow-indigo-200"
        }`}
      >
        <span className="text-lg tracking-wider drop-shadow-md">QUAY</span>
      </button>
    </div>
  );
};

export default Wheel;
