import React, { useState } from 'react';
import { optimizeResume } from '../utils/openrouter';

interface Props {
  resumeText: string;
  jobDescription: string;
}

export const ResumeOptimizer: React.FC<Props> = ({ resumeText, jobDescription }) => {
  const [optimized, setOptimized] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleOptimize = async () => {
    setLoading(true);
    const result = await optimizeResume(resumeText, jobDescription);
    setOptimized(result);
    setLoading(false);
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleOptimize}
        className="bg-primary text-white px-4 py-2 rounded-full"
      >
        Optimize Resume
      </button>
      {loading && <p className="mt-2 text-gray-500">Optimizing...</p>}
      {optimized && (
        <div className="mt-4 text-left">
          <h3 className="font-semibold mb-2">Optimized Resume</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded-lg">
            {optimized}
          </pre>
        </div>
      )}
    </div>
  );
};
