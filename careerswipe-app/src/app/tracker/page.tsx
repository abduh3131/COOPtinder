'use client';
import React, { useState } from 'react';
import { TrackerTable, Application } from '../../components/TrackerTable';

export default function TrackerPage() {
  const [apps] = useState<Application[]>([
    { id: 1, title: 'Frontend Developer', company: 'TD Bank', date: '2024-06-01', method: 'Auto', status: 'Pending' },
    { id: 2, title: 'Data Analyst', company: 'GreenTech', date: '2024-06-02', method: 'Manual', status: 'Interview' },
  ]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-primary mb-4">Application Tracker</h1>
      <TrackerTable applications={apps} />
    </div>
  );
}
