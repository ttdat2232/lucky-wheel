import confetti from "canvas-confetti";
import {
    ChevronLeft,
    ChevronRight,
    Menu as MenuIcon,
    Volume2,
    VolumeX,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Wheel from "./components/Wheel";
import WinnerPopup from "./components/WinnerPopup";
import { NameItem } from "./types";

const WHEEL_COLORS = [
    "#f87171",
    "#fb923c",
    "#fbbf24",
    "#facc15",
    "#a3e635",
    "#4ade80",
    "#34d399",
    "#2dd4bf",
    "#22d3ee",
    "#38bdf8",
    "#60a5fa",
    "#818cf8",
    "#a78bfa",
    "#c084fc",
    "#e879f9",
    "#fb7185",
];

export const MEME_IMAGES = [
    "https://i.pinimg.com/736x/1e/9f/13/1e9f13db744cb54584e5386112721889.jpg",
];

export const WINNER_MEME_IMAGES = [
    "https://i.pinimg.com/736x/02/0c/21/020c2108df2fe7d5894226a92b08d46e.jpg",
];

const WIN_SOUND_URL =
    "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3";

const App: React.FC = () => {
    const [inputText, setInputText] = useState(
        "Nguyễn Văn A\nTrần Thị B\nLê Văn C\nPhạm Thị D\nHoàng Văn E",
    );
    const [luckyPerson, setLuckyPerson] = useState<string | null>(null);
    const [luckyMeme, setLuckyMeme] = useState<string>("");
    const [isSpinning, setIsSpinning] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const winAudio = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        winAudio.current = new Audio(WIN_SOUND_URL);
    }, []);

    const nameItems = useMemo(() => {
        return inputText
            .split("\n")
            .map((name) => name.trim())
            .filter((name) => name !== "")
            .map((name, index) => ({
                id: `${name}-${index}`,
                text: name,
                color: WHEEL_COLORS[index % WHEEL_COLORS.length],
            }));
    }, [inputText]);

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 9999,
        };
        const randomInRange = (min: number, max: number) =>
            Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);
    };

    const handleSpinEnd = (winningItem: NameItem) => {
        const winningName = winningItem.text;
        setLuckyPerson(winningName);

        // Remove the winning name from the input so it can't be spun again
        setInputText((prev) => {
            const lines = prev.split("\n");
            const idx = lines.findIndex((l) => l.trim() === winningName);
            if (idx === -1) return prev;
            lines.splice(idx, 1);
            return lines.filter((l) => l.trim() !== "").join("\n");
        });

        // const randomMeme =
        //   MEME_IMAGES[Math.floor(Math.random() * MEME_IMAGES.length)];
        setLuckyMeme(
            WINNER_MEME_IMAGES[
                Math.floor(Math.random() * WINNER_MEME_IMAGES.length)
            ],
        );

        setHistory((prev) => [winningName, ...prev].slice(0, 10));
        setShowPopup(true);

        if (!isMuted && winAudio.current) {
            winAudio.current.currentTime = 0;
            winAudio.current
                .play()
                .catch((e) => console.log("Audio play failed", e));
        }

        triggerConfetti();
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const clearHistory = () => {
        if (confirm("Bạn có chắc muốn xóa lịch sử quay?")) {
            setHistory([]);
        }
    };

    return (
        <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
            {!isSidebarOpen && (
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg md:hidden"
                >
                    <MenuIcon size={20} />
                </button>
            )}

            <button
                onClick={() => setIsMuted(!isMuted)}
                className="fixed top-4 right-4 z-50 p-3 bg-white border border-slate-200 text-slate-600 rounded-full shadow-lg hover:bg-slate-50 transition-all active:scale-95"
                title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            >
                {isMuted ? (
                    <VolumeX size={24} />
                ) : (
                    <Volume2 size={24} className="text-indigo-600" />
                )}
            </button>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                inputText={inputText}
                setInputText={setInputText}
                nameItems={nameItems}
                history={history}
                clearHistory={clearHistory}
            />

            <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="hidden md:flex absolute top-1/2 -left-3 z-50 p-1 bg-white border shadow-md rounded-full text-slate-400 hover:text-indigo-600 transition-colors"
                >
                    {isSidebarOpen ? (
                        <ChevronLeft size={20} />
                    ) : (
                        <ChevronRight size={20} />
                    )}
                </button>

                <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12 flex flex-col items-center gap-10">
                    <Header />

                    <div className="w-full flex justify-center">
                        <Wheel
                            items={nameItems}
                            onSpinEnd={handleSpinEnd}
                            isSpinning={isSpinning}
                            setIsSpinning={setIsSpinning}
                            isMuted={isMuted}
                        />
                    </div>
                </div>

                <WinnerPopup
                    show={showPopup}
                    onClose={closePopup}
                    winner={luckyPerson}
                    memeUrl={luckyMeme}
                />
            </main>

            <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-scale-up {
          animation: scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
        </div>
    );
};

export default App;
