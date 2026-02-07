import { getWinnerIndex } from "@/components/wheel/wheelMath";
import { NameItem } from "@/types/nameItem";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseWheelSpinParams {
  items: NameItem[];
  isMuted: boolean;
  onSpinEnd: (item: NameItem) => void;
  winningAudioUrl: string;
}

export function useWheelSpin({
  items,
  isMuted,
  onSpinEnd,
  winningAudioUrl,
}: UseWheelSpinParams) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(winningAudioUrl);
    audioRef.current.loop = true;
  }, []);

  const spin = useCallback(() => {
    if (isSpinning || items.length === 0) return;

    setIsSpinning(true);

    if (!isMuted && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    const spinDegrees = 1800 + Math.random() * 360;
    const nextRotation = rotation + spinDegrees;
    setRotation(nextRotation);

    setTimeout(() => {
      setIsSpinning(false);
      audioRef.current?.pause();

      const index = getWinnerIndex(nextRotation, items.length);
      onSpinEnd(items[index]);
    }, 4000);
  }, [isSpinning, items, isMuted, rotation, onSpinEnd]);

  return {
    rotation,
    isSpinning,
    spin,
  };
}
