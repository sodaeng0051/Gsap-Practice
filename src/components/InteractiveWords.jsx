import React, { useRef, useEffect } from "react";
import "./InteractiveWords.css";

export default function InteractiveWords() {
  const canvasRef = useRef(null);
  const words = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const trail = useRef([]);

  const text =
    "CREATING NEW PHYSICAL WORLDS, AND VIRTUAL WHERE CREATIVITY KNOWS NO BOUNDS.";

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    /** ✅ 반응형 캔버스 초기화 */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initWords();
    };

    /** ✅ 단어 초기화 및 위치 계산 */
    const initWords = () => {
      ctx.font = `${Math.max(window.innerWidth * 0.025, 20)}px 'Cormorant Garamond', serif`;
      ctx.textBaseline = "middle"; // 🔥 글씨 세로 중앙 기준
      const wordList = text.split(" ");
      const startX = canvas.width * 0.12;
      const startY =
        window.innerWidth < 768
          ? canvas.height * 0.75 // 모바일일수록 더 아래
          : canvas.height * 0.7; // 데스크탑은 약간 아래쪽

      let x = startX;

      words.current = wordList.map((word) => {
        const width = ctx.measureText(word).width + 40;
        const obj = {
          word,
          x,
          y: startY,
          ox: x,
          oy: startY,
          vx: 0,
          vy: 0,
        };
        x += width;
        return obj;
      });
    };

    /** ✅ 커서 궤적 라인 */
    const drawTrail = () => {
      if (trail.current.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(trail.current[0].x, trail.current[0].y);
      for (let i = 1; i < trail.current.length; i++) {
        const p = trail.current[i];
        ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(200, 60, 20, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.stroke();
    };

    /** ✅ 애니메이션 루프 */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${Math.max(window.innerWidth * 0.025, 20)}px 'Cormorant Garamond', serif`;
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000";

      drawTrail();

      // ✨ 단어 반응 애니메이션
      words.current.forEach((w) => {
        const dx = mouse.current.x - w.x;
        const dy = mouse.current.y - w.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 160;
        const force = Math.max(0, (maxDist - dist) / maxDist);
        const angle = Math.atan2(dy, dx);

        const fx = Math.cos(angle) * force * -2.2; // 💡 살짝만 밀림
        const fy = Math.sin(angle) * force * -2.2;

        w.vx += fx;
        w.vy += fy;
        w.vx *= 0.8;
        w.vy *= 0.8;

        w.x += w.vx + (w.ox - w.x) * 0.05;
        w.y += w.vy + (w.oy - w.y) * 0.05;

        ctx.fillText(w.word, w.x, w.y);
      });

      // ✨ 커서 라인 길이 제한
      if (trail.current.length > 60) trail.current.shift();

      requestAnimationFrame(animate);
    };

    /** ✅ 마우스 이벤트 */
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      trail.current.push({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-words-canvas" />;
}
