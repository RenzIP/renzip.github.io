"use client";
import { useEffect, useRef } from "react";

// Background animasi kelopak sakura (subtle), menghormati reduced-motion
export default function SakuraBackground(){
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(()=>{
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const petals = Array.from({length: prefersReduced ? 0 : 20}).map(()=>({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      r: 3 + Math.random()*2,
      s: 0.5 + Math.random()*0.8,
    }));

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(const p of petals){
        p.y += p.s; p.x += Math.sin(p.y*0.01)*0.3;
        if(p.y > canvas.height+10){ p.y = -10; p.x = Math.random()*canvas.width; }
        ctx.beginPath();
        ctx.fillStyle = "rgba(236,72,153,0.10)"; // pink-500/10
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  },[]);
  return <canvas aria-hidden className="pointer-events-none fixed inset-0 -z-10" ref={ref}/>;
}
