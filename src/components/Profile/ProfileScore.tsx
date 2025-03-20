import React from "react";

interface ProfileScoreProps {
  score: string;
}

const ProfileScore: React.FC<ProfileScoreProps> = ({ score }) => {
  const percentage = Math.max(0, Math.min(100, Number(score)));

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let color;

  if (percentage < 30) {
    color = "#ef4444";
  } else if (percentage < 70) {
    color = "#facc15";
  } else {
    color = "#22c55e";
  }

  return (
    <div className="">
      <div className="relative">
        <svg width={120} height={120} className="transform rotate-90">
          <circle
            cx={60}
            cy={60}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx={60}
            cy={60}
            r={radius}
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>

        <div
          className="absolute top-1/2 left-1/2 text-center"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <p className="text-lg text-gray-900 font-bold">{percentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScore;
