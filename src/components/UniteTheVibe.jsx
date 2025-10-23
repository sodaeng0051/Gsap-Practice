import React, { useState } from "react";

export default function UniteTheVibe() {
  // 🎨 카드 색상
  const colors = [
    "#FF6B6B",
    "#FFD93D",
    "#6BCB77",
    "#4D96FF",
    "#845EC2",
    "#FF9671",
    "#00C9A7",
    "#FFC75F",
  ];

  // 📍 카드 위치 (텍스트 피해서 배치)
  const positions = [
    { x: -420, y: -160 },
    { x: -260, y: -180 },
    { x: 380, y: -220 },
    { x: 440, y: 80 },
    { x: -380, y: 160 },
    { x: -120, y: 260 },
    { x: 180, y: 260 },
    { x: 320, y: -80 },
  ];

  // ✨ 현재 활성화된 카드 인덱스 (하나만 반응)
  const [activeCard, setActiveCard] = useState(null);

  // 🖱 클릭 시 하나만 반응하도록
  const handleCardClick = (index) => {
    // 이미 클릭된 카드면 해제, 아니면 새 카드 활성화
    setActiveCard((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative w-screen h-screen bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center text-white">
      {/* 🟪 카드 레이어 */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        {positions.map((pos, i) => {
          const size = 140 + (i % 3) * 25; // 카드 크기 살짝 다르게
          const rotation = Math.random() * 20 - 10;
          const depth = Math.random() * 20 - 10;
          const color = colors[i % colors.length];
          const isActive = activeCard === i;

          return (
            <div
              key={i}
              onClick={() => handleCardClick(i)}
              className="absolute rounded-3xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={{
                width: `${size}px`,
                height: `${size * 1.2}px`,
                backgroundColor: color,
                transform: `
                  translate(${pos.x}px, ${pos.y}px)
                  rotate(${rotation}deg)
                  scale(${isActive ? 1.15 : 1})
                  translateZ(${isActive ? 60 : depth}px)
                `,
                boxShadow: isActive
                  ? `0 30px 60px rgba(0,0,0,0.6), 0 0 50px ${color}80`
                  : `0 10px 25px rgba(0,0,0,0.3), 0 0 20px ${color}40`,
                zIndex: isActive ? 999 : Math.round(100 + depth),
                opacity: isActive ? 1 : 0.9,
                border: isActive
                  ? "1px solid rgba(255,255,255,0.4)"
                  : "1px solid rgba(255,255,255,0.1)",
              }}
            />
          );
        })}
      </div>

      {/* ✨ 중앙 텍스트 */}
      <div className="relative z-10 text-center select-none">
        <h1 className="text-[6rem] font-extrabold leading-none tracking-tight text-gray-100 drop-shadow-[0_0_25px_rgba(0,0,0,0.4)]">
          Unite
        </h1>
        <h2 className="text-[5rem] font-bold text-gray-300 -mt-3 drop-shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          the Vibe
        </h2>
        <p className="mt-6 text-gray-400 text-sm max-w-[420px] mx-auto leading-relaxed">
          A visual connection between sound, energy, and emotion.
        </p>
      </div>
    </div>
  );
}
