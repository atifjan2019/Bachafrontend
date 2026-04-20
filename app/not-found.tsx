"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4">
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out pointer-events-none"
        style={{
          background: `
            radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(232,29,37,0.06), transparent 50%),
            radial-gradient(800px circle at 20% 80%, rgba(232,29,37,0.03), transparent 50%)
          `,
        }}
      />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-20 h-20 rounded-full border border-ink-10 animate-float-slow opacity-40" />
        <div className="absolute top-[60%] right-[15%] w-14 h-14 rounded-lg border border-ink-10 rotate-45 animate-float-medium opacity-30" />
        <div className="absolute bottom-[20%] left-[20%] w-10 h-10 rounded-full border border-brand-red/20 animate-float-fast opacity-40" />
        <div className="absolute top-[30%] right-[25%] w-6 h-6 rounded-full bg-brand-red/5 animate-float-medium" />
        <div className="absolute bottom-[40%] left-[60%] w-16 h-16 rounded-lg border border-ink-10 -rotate-12 animate-float-slow opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg">
        {/* Glitch-style 404 */}
        <div className="relative mb-6">
          <p className="font-display text-[10rem] sm:text-[12rem] font-bold leading-none tracking-tightest text-ink-10 select-none">
            404
          </p>
          <p className="absolute inset-0 font-display text-[10rem] sm:text-[12rem] font-bold leading-none tracking-tightest text-brand-red/10 select-none animate-glitch-1">
            404
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block w-12 h-px bg-gradient-to-r from-transparent to-ink-10" />
          <span className="block w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          <span className="block w-12 h-px bg-gradient-to-l from-transparent to-ink-10" />
        </div>

        <h1 className="font-display text-2xl sm:text-3xl text-ink tracking-tighter font-semibold mb-3">
          This page is out of stock
        </h1>

        <p className="text-ink-50 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
          The page you&apos;re looking for has been moved, deleted, or perhaps
          never existed. Let&apos;s get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 bg-brand-black text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:bg-ink-70 hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2.5 border border-ink-10 bg-white text-brand-black px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:border-brand-black hover:shadow-md hover:-translate-y-0.5"
          >
            Browse Shop
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>

        {/* Search hint */}
        <p className="mt-10 text-xs text-ink-30">
          Error 404 — Page Not Found
        </p>
      </div>

      {/* Inline keyframes */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-15px) rotate(50deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 2px); }
          40% { clip-path: inset(40% 0 30% 0); transform: translate(3px, -1px); }
          60% { clip-path: inset(60% 0 10% 0); transform: translate(-2px, 1px); }
          80% { clip-path: inset(10% 0 80% 0); transform: translate(2px, -2px); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-glitch-1 { animation: glitch-1 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
