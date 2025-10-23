import React, { useEffect, useRef } from "react";

export default function ParticleCloud() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    let width = window.innerWidth;
    let height = window.innerHeight;

    function createParticles() {
      const rectSize = Math.min(width, height) * 0.4;
      const gap = 10;
      const list = [];
      for (let y = -rectSize / 2; y <= rectSize / 2; y += gap) {
        for (let x = -rectSize / 2; x <= rectSize / 2; x += gap) {
          const offsetX = (Math.random() - 0.5) * 10;
          const offsetY = (Math.random() - 0.5) * 10;
          list.push({
            baseX: x + width / 2,
            baseY: y + height / 2,
            x: x + offsetX + width / 2,
            y: y + offsetY + height / 2,
            size: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
          });
        }
      }
      particlesRef.current = list;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // use CSS pixels in drawing
      createParticles();
    }

    function onMouseMove(e) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function animate() {
      const particles = particlesRef.current;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "white";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // vibration
        p.x += p.vx;
        p.y += p.vy;
        if (Math.abs(p.x - p.baseX) > 3) p.vx *= -1;
        if (Math.abs(p.y - p.baseY) > 3) p.vy *= -1;

        // mouse interaction (guarded)
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (mx !== null && my !== null) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouseRef.current.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            const moveX = Math.cos(angle) * force * 8;
            const moveY = Math.sin(angle) * force * 8;
            p.x -= moveX;
            p.y -= moveY;
          } else {
            p.x += (p.baseX - p.x) * 0.03;
            p.y += (p.baseY - p.y) * 0.03;
          }
        } else {
          // no mouse -> return
          p.x += (p.baseX - p.x) * 0.03;
          p.y += (p.baseY - p.y) * 0.03;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    }

    // init
    resize();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", resize);
    animate();

    // cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
