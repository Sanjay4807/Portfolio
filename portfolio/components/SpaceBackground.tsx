"use client";

import React, { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width: number, height: number, dpr: number;
    let animationFrameId: number;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const STAR_COUNT = 250;
    const stars: Star[] = [];

    class Star {
      x!: number;
      y!: number;
      size!: number;
      alpha!: number;
      alphaSpeed!: number;
      speedY!: number;
      
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.8 + 0.8;
        this.alpha = Math.random() * 0.6 + 0.4;
        this.alphaSpeed = (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1);
        this.speedY = Math.random() * 0.15 + 0.03;
      }
      update() {
        this.alpha += this.alphaSpeed;
        if (this.alpha <= 0.2 || this.alpha >= 1) {
          this.alphaSpeed = -this.alphaSpeed;
        }
        this.y += this.speedY;
        if (this.y > height) {
          this.y = 0;
          this.x = Math.random() * width;
        }
      }
      draw() {
        ctx!.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    class ShootingStar {
      x!: number;
      y!: number;
      length!: number;
      speed!: number;
      size!: number;
      angle!: number;
      alpha!: number;
      active!: boolean;
      
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width * 1.2 - width * 0.1;
        this.y = Math.random() * (height * 0.4);
        this.length = Math.random() * 100 + 60;
        this.speed = Math.random() * 12 + 8;
        this.size = Math.random() * 2 + 1;
        this.angle = Math.PI / 4;
        this.alpha = 1;
        this.active = false;
      }
      spawn() {
        this.reset();
        this.active = true;
      }
      update() {
        if (!this.active) return;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.02;
        if (this.alpha <= 0 || this.x > width || this.y > height) {
          this.active = false;
        }
      }
      draw() {
        if (!this.active) return;
        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;

        const grad = ctx!.createLinearGradient(this.x, this.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx!.strokeStyle = grad;
        ctx!.lineWidth = this.size;
        ctx!.beginPath();
        ctx!.moveTo(this.x, this.y);
        ctx!.lineTo(tailX, tailY);
        ctx!.stroke();
      }
    }

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(new Star());
    }
    const shootingStar = new ShootingStar();

    const animate = () => {
      ctx!.fillStyle = '#03050d';
      ctx!.fillRect(0, 0, width, height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      if (!shootingStar.active && Math.random() < 0.02) {
        shootingStar.spawn();
      }
      shootingStar.update();
      shootingStar.draw();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        zIndex: -1
      }}
    />
  );
};

export default SpaceBackground;
