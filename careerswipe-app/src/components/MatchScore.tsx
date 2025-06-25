import React from 'react';

interface Props {
  score: number;
}

export const MatchScore: React.FC<Props> = ({ score }) => {
  return (
    <div className="mt-2">
      <p className="text-sm text-gray-700">Match Score: {score}%</p>
      <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
        <div
          className="bg-primary h-2 rounded-full"
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};
