import React from 'react';

interface Props {
  onLeft: () => void;
  onRight: () => void;
}

export const SwipeActions: React.FC<Props> = ({ onLeft, onRight }) => (
  <div className="flex gap-6 justify-center mt-4">
    <button
      onClick={onLeft}
      className="bg-gray-300 px-6 py-3 rounded-full text-lg"
    >
      Skip
    </button>
    <button
      onClick={onRight}
      className="bg-primary text-white px-6 py-3 rounded-full text-lg"
    >
      Apply
    </button>
  </div>
);
