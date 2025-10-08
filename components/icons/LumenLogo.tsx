import React from 'react';

export const LumenLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Lumen Logo"
    role="img"
    {...props}
  >
    <defs>
      <linearGradient id="lumenLogoGradient" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#60a5fa" /> {/* Corresponds to Tailwind's blue-400 */}
        <stop offset="100%" stopColor="#a855f7" /> {/* Corresponds to Tailwind's purple-500 */}
      </linearGradient>
      <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.7 0" result="glow" />
        <feComposite in="glow" in2="SourceGraphic" operator="over" />
      </filter>
    </defs>
    <g filter="url(#logoGlow)">
      <path
        d="M 25 20 V 80 H 75"
        stroke="url(#lumenLogoGradient)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 70 25 L 85 40 L 70 55"
        stroke="url(#lumenLogoGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  </svg>
);
