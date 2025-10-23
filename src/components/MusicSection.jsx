import React, { useEffect } from "react";
import { gsap } from "gsap";
import "../App.css";

export default function MusicSection() {
  useEffect(() => {
    const items = gsap.utils.toArray(".falling-item");

    items.forEach((item) => {
      const startX = Math.random() * window.innerWidth * 0.8;
      const startY = -100 - Math.random() * 200;
      const endY = window.innerHeight * 0.88; // 바닥선
      const delay = Math.random() * 0.8;

      gsap.set(item, {
        x: startX,
        y: startY,
        rotation: Math.random() * 45 - 22,
        scale: 0.8 + Math.random() * 0.5,
      });

      // 낙하
      gsap.to(item, {
        y: endY,
        duration: 2 + Math.random(),
        ease: "bounce.out",
        delay,
      });

      // 좌우 흔들림
      gsap.to(item, {
        rotation: "+=" + (Math.random() * 30 - 15),
        repeat: -1,
        yoyo: true,
        duration: 3 + Math.random() * 2,
        ease: "sine.inOut",
        delay: delay + 2,
      });
    });
  }, []);

  // 색상 팔레트
  const colors = [
    "#FF6B6B", // 빨강
    "#FFD93D", // 노랑
    "#6BCB77", // 초록
    "#4D96FF", // 파랑
    "#845EC2", // 보라
    "#FF9671", // 주황
    "#00C9A7", // 민트
    "#FFC75F", // 골드
    "#F9F871", // 연노랑
    "#C34A36", // 와인
  ];

  return (
    <section className="music-section">
      <h1 className="music-title">MUSIC</h1>
      <p className="music-sub">Taking control of how you experience</p>

      <div className="falling-container">
        {/* 🎨 랜덤 색상 카드 10개 */}
        {colors.map((color, index) => (
          <div
            key={index}
            className="falling-item color-card"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </section>
  );
}
