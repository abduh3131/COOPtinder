'use client';
import React, { useState } from 'react';
import { JobCard, Job } from '../../components/JobCard';
import { mockJobs } from '../../utils/mockJobs';
import { ResumeOptimizer } from '../../components/ResumeOptimizer';
import { calculateMatch } from '../../utils/resumeMatcher';
import { MatchScore } from '../../components/MatchScore';

export default function SwipePage() {
  const [index, setIndex] = useState(0);
  const [resume] = useState('');

  const job = mockJobs[index];

  const handleRight = (job: Job) => {
    // in real app, save application and optimize resume
    alert(`Applied to ${job.title}`);
  };

  const handleLeft = () => {
    setIndex((prev) => (prev + 1) % mockJobs.length);
  };

  if (!job) return <p>No more jobs.</p>;

  const match = calculateMatch(resume, job.title + ' ' + job.location);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <JobCard job={job} onSwipeRight={handleRight} onSwipeLeft={handleLeft} />
      <MatchScore score={match} />
      <ResumeOptimizer resumeText={resume} jobDescription={job.title} />
    </div>
  );
}
