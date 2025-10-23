import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import "./BouncyBalls.css";

export default function BouncyBalls() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    const Engine = Matter.Engine,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    const world = engine.world;
    world.gravity.y = 1;

    // Canvas 생성
    const width = 600;
    const height = 500;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    // 벽 + 바닥
    const ground = Bodies.rectangle(width / 2, height + 20, width, 40, {
      isStatic: true,
    });
    const wallLeft = Bodies.rectangle(-20, height / 2, 40, height, {
      isStatic: true,
    });
    const wallRight = Bodies.rectangle(width + 20, height / 2, 40, height, {
      isStatic: true,
    });

    // 공 생성
    const balls = [];
    const cols = 8;
    const rows = 3;
    const radius = 60;
    const spacing = 110;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const offsetX = x * spacing + (Math.random() - 0.5) * 20;
        const offsetY = y * spacing - 300 + (Math.random() - 0.5) * 20;
        balls.push(
          Bodies.circle(offsetX + 80, offsetY, radius, {
            restitution: 0.9,
            friction: 0.03,
            frictionAir: 0.01,
            density: 0.001,
          })
        );
      }
    }

    Composite.add(world, [ground, wallLeft, wallRight, ...balls]);

    // 🎯 MouseConstraint — 클릭 & 드래그
    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(world, mouseConstraint);

    // 🎨 도트 질감
    const dotPattern = document.createElement("canvas");
    dotPattern.width = 8;
    dotPattern.height = 8;
    const dotCtx = dotPattern.getContext("2d");
    dotCtx.fillStyle = "#00994D";
    dotCtx.beginPath();
    dotCtx.arc(4, 4, 1, 0, Math.PI * 2);
    dotCtx.fill();

    // 🎨 3D 공 그리기
    const draw3DBall = (x, y, r) => {
      const gradient = ctx.createRadialGradient(
        x - r / 3,
        y - r / 3,
        r / 10,
        x,
        y,
        r
      );
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(0.2, "#d9ffe0");
      gradient.addColorStop(0.6, "#4cd38a");
      gradient.addColorStop(1, "#007a3e");

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // 반사광
      const highlight = ctx.createRadialGradient(
        x - r / 2.5,
        y - r / 2.5,
        0,
        x,
        y,
        r
      );
      highlight.addColorStop(0, "rgba(255,255,255,0.6)");
      highlight.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = highlight;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      // 도트 질감
      const pattern = ctx.createPattern(dotPattern, "repeat");
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = pattern;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    // 🎬 루프
    const renderLoop = () => {
      Matter.Engine.update(engine, 1000 / 60);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#f2fff5";
      ctx.fillRect(0, 0, width, height);
      balls.forEach(({ position, circleRadius }) =>
        draw3DBall(position.x, position.y, circleRadius)
      );
      requestAnimationFrame(renderLoop);
    };

    renderLoop();
    Runner.run(Runner.create(), engine);

    // cleanup
    return () => {
      if (container.contains(canvas)) container.removeChild(canvas);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div className="superhi-wrapper">
      <div className="left">
        <h2 className="title">
          A new cooperative way <br /> to create content + get paid
        </h2>
        <div ref={sceneRef} className="physics-scene" />
      </div>

      <div className="right">
        <p className="desc">
          SuperHi Plus is a brand new model of co-ownership with funding,
          support, and creator-led tools to help you kickstart your content.
        </p>
        <div className="icons">
          <div className="icon-item">
            $12,000 <br />
            <small>Funding</small>
          </div>
          <div className="icon-item">
            12 weeks <br />
            <small>Program</small>
          </div>
          <div className="icon-item">
            Tools <br />
            <small>Creator-led</small>
          </div>
        </div>
      </div>
    </div>
  );
}
