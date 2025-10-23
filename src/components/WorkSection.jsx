import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./WorkSection.css";

export default function WorkSection() {
  const cardsRef = useRef([]);
  const [current, setCurrent] = useState(2);
  const total = 5;

  // 카드 정렬 함수
  const arrangeCards = (index) => {
    gsap.killTweensOf(cardsRef.current); // 🔥 기존 애니메이션 중단 (즉시 반응)

    cardsRef.current.forEach((card, i) => {
      const offset = i - index;
      const abs = Math.abs(offset);

      gsap.to(card, {
        x: offset * 320,
        z: -abs * 150,
        scale: i === index ? 1 : 0.88 - abs * 0.04,
        rotationY: offset * -25,
        opacity: i === index ? 1 : 0.45,
        zIndex: 10 - abs,
        duration: 0.35, // ⚡ 즉각 반응
        ease: "power2.out",
      });
    });
  };

  useEffect(() => {
    arrangeCards(current);
  }, [current]);

  // 슬라이드 이동 (좌/우 클릭)
  const slide = (dir) => {
    gsap.killTweensOf(cardsRef.current);
    setCurrent((prev) => (prev + dir + total) % total);
  };

  return (
    <section className="work-section">
      <h2 className="work-title">
        our <span>work</span>
        <br />
        <strong>speaks</strong> for us
      </h2>

      <div className="work-slider">
        {[...Array(total)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="work-card"
          >
            <div className="work-inner">
              <div
                className="work-image"
                style={{
                  backgroundImage: `url(https://picsum.photos/400/300?random=${i})`,
                }}
              ></div>
              <div className="work-info">
                <h3>Creative Project {i + 1}</h3>
                <p>
                  Launch a new brand with impactful design and storytelling.
                </p>
                <button className="work-btn">→</button>
              </div>
            </div>
          </div>
        ))}

        {/* 🔽 좌우 화살표 버튼 */}
        <button className="nav-btn left" onClick={() => slide(-1)}>
          ‹
        </button>
        <button className="nav-btn right" onClick={() => slide(1)}>
          ›
        </button>
      </div>
    </section>
  );
}
