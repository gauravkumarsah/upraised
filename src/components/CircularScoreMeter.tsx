import React from 'react';
import styles from './quiz.module.css';

interface CircularScoreMeterProps {
  percentage: number;
}

const CircularScoreMeter: React.FC<CircularScoreMeterProps> = ({
  percentage,
}) => {
  const strokeWidth = 20;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  // Calculate the stroke dash offset to represent the percentage
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        viewBox="0 0 500 260"
        fill="none"
        style={{ position: 'absolute', top: '-32' }}
      >
        <path
          d="M490 250C490 117.452 382.548 10 250 10C117.452 10 10 117.452 10 250"
          stroke="url(#paint0_linear_86_5)"
          stroke-width="20"
          stroke-linecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_86_5"
            x1="490"
            y1="10"
            x2="10"
            y2="10"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#44B77B" />
            <stop offset="0.479043" stop-color="#FFD033" />
            <stop offset="1" stop-color="#FF3B3F" />
          </linearGradient>
        </defs>
      </svg>

      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#eee"
          strokeWidth={strokeWidth}
        />

        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#ddd"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={90}
          strokeLinecap="round"
          transform="rotate(-220 60 60)"
        />

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fontSize="20"
          className={styles.scoreText}
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default CircularScoreMeter;
