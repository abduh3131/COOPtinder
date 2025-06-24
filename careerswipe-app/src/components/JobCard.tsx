import React from 'react';

export interface Job {
  id: number;
  company: string;
  title: string;
  location: string;
  salary?: string;
  remote?: boolean;
  tags?: string[];
  logo?: string;
}

interface Props {
  job: Job;
  onSwipeRight: (job: Job) => void;
  onSwipeLeft: (job: Job) => void;
}

export const JobCard: React.FC<Props> = ({ job, onSwipeRight, onSwipeLeft }) => {
  const handleRight = () => onSwipeRight(job);
  const handleLeft = () => onSwipeLeft(job);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center max-w-sm mx-auto">
      {job.logo && (
        <img src={job.logo} alt={job.company} className="w-16 h-16 mb-2" />
      )}
      <h2 className="text-xl font-semibold text-primary mb-1">{job.title}</h2>
      <p className="text-gray-700 mb-1">{job.company}</p>
      <p className="text-sm text-gray-500 mb-2">{job.location}</p>
      {job.salary && (
        <p className="text-sm text-gray-500 mb-2">Salary: {job.salary}</p>
      )}
      {job.tags && (
        <div className="flex flex-wrap gap-1 mb-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="bg-accent text-white text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-4 mt-2">
        <button
          onClick={handleLeft}
          className="bg-gray-300 px-4 py-2 rounded-full"
        >
          Skip
        </button>
        <button
          onClick={handleRight}
          className="bg-primary text-white px-4 py-2 rounded-full"
        >
          Apply
        </button>
      </div>
    </div>
  );
};
