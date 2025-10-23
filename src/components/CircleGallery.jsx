import { useEffect } from "react";
import { gsap } from "gsap";

export default function CircleGallery() {
  // 🎨 색상 팔레트 (원형 카드용)
  const colors = [
    "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF",
    "#845EC2", "#FF9671", "#00C9A7", "#FFC75F",
    "#F9F871", "#E07A5F", "#3D405B", "#81B29A",
  ];

  // 🌀 GSAP로 원형 회전 애니메이션
  useEffect(() => {
    gsap.to(".circle", {
      rotation: 360,
      duration: 80,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%", // 공식 문서 기준 설정
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-[#0B0B0B] overflow-hidden">
      {/* 중앙 텍스트 */}
      <div className="absolute text-center z-10 max-w-[480px]">
        <h2 className="text-white font-semibold text-4xl mb-3 tracking-tight">
          Gather Memes
        </h2>
        <p className="text-gray-400 text-base leading-relaxed">
          Turning waiting into experience — a seamless, living circle of design.
        </p>
        <button className="mt-6 bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
          Join Now
        </button>
      </div>

      {/* 원형 카드들 */}
      <div className="circle relative w-[800px] h-[800px]">
        {colors.map((color, i) => {
          const angle = (i / colors.length) * 360;
          const radius = 350; // 원 크기
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px - 35px)`,
                top: `calc(50% + ${y}px - 35px)`,
                transform: `rotate(${angle}deg)`,
              }}
            >
              <div
                className="w-[70px] h-[70px] rounded-lg shadow-lg transition-transform duration-300 hover:scale-110"
                style={{ backgroundColor: color }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
