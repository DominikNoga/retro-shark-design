import { useMemo } from 'react';

export function OceanBackground() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${4 + Math.random() * 18}px`,
        duration: `${8 + Math.random() * 14}s`,
        delay: `${Math.random() * 12}s`,
      })),
    [],
  );

  const rays = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: `${10 + i * 20}%`,
        delay: `${i * 1.5}s`,
      })),
    [],
  );

  return (
    <div className="fixed inset-0 ocean-bg pointer-events-none" style={{ zIndex: 0 }}>
      {rays.map((r) => (
        <div
          key={r.id}
          className="light-ray"
          style={{
            left: r.left,
            transform: `rotate(${(parseInt(r.left) - 50) * 0.15}deg)`,
            animationDelay: r.delay,
          }}
        />
      ))}
      <div className="shark-swim" style={{ top: '12%' }}>
        <svg width="56" height="28" viewBox="0 0 48 24" fill="currentColor" className="text-cyan-200">
          <path d="M2 12 Q10 4, 24 8 L30 2 L30 10 Q38 12, 46 12 Q38 14, 30 14 L30 22 L24 16 Q10 20, 2 12 Z" />
          <circle cx="38" cy="11" r="1" fill="#0a1929" />
        </svg>
      </div>
      <div className="shark-swim-reverse" style={{ top: '38%', animationDelay: '5s' }}>
        <svg width="42" height="21" viewBox="0 0 48 24" fill="currentColor" className="text-teal-200">
          <path d="M2 12 Q10 4, 24 8 L30 2 L30 10 Q38 12, 46 12 Q38 14, 30 14 L30 22 L24 16 Q10 20, 2 12 Z" />
          <circle cx="38" cy="11" r="1" fill="#0a1929" />
        </svg>
      </div>
      <div className="shark-swim" style={{ top: '62%', animationDelay: '12s', animationDuration: '35s' }}>
        <svg width="34" height="17" viewBox="0 0 48 24" fill="currentColor" className="text-blue-200">
          <path d="M2 12 Q10 4, 24 8 L30 2 L30 10 Q38 12, 46 12 Q38 14, 30 14 L30 22 L24 16 Q10 20, 2 12 Z" />
        </svg>
      </div>
      <div className="shark-swim-reverse" style={{ top: '82%', animationDelay: '8s', animationDuration: '32s' }}>
        <svg width="38" height="19" viewBox="0 0 48 24" fill="currentColor" className="text-cyan-300">
          <path d="M2 12 Q10 4, 24 8 L30 2 L30 10 Q38 12, 46 12 Q38 14, 30 14 L30 22 L24 16 Q10 20, 2 12 Z" />
          <circle cx="38" cy="11" r="1" fill="#0a1929" />
        </svg>
      </div>
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDuration: b.duration,
            animationDelay: b.delay,
            bottom: '0',
          }}
        />
      ))}
    </div>
  );
}

export function SharkLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 48 34"
      fill="none"
      className="fin-sway"
    >
      <defs>
        <linearGradient id="sharkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06b6a4" />
          <stop offset="100%" stopColor="#0d2840" />
        </linearGradient>
        <linearGradient id="sharkGrad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a6b94" />
          <stop offset="100%" stopColor="#134e6f" />
        </linearGradient>
      </defs>
      <path
        d="M3 22 Q12 8, 28 14 L34 4 L34 16 Q40 18, 46 22 Q40 26, 34 28 L34 34 L28 24 Q12 30, 3 22 Z"
        fill="url(#sharkGrad)"
      />
      <path
        d="M3 22 Q12 8, 28 14 L34 4 L34 16 Q40 18, 46 22"
        stroke="url(#sharkGrad2)"
        strokeWidth="0.5"
        fill="none"
      />
      <circle cx="38" cy="20" r="1.5" fill="#0a1929" />
      <path d="M14 18 Q18 16, 22 17" stroke="#0a1929" strokeWidth="0.3" fill="none" opacity="0.3" />
      <path d="M14 21 Q18 19, 22 20" stroke="#0a1929" strokeWidth="0.3" fill="none" opacity="0.2" />
    </svg>
  );
}
