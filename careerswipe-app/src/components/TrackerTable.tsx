import React from 'react';

export interface Application {
  id: number;
  title: string;
  company: string;
  date: string;
  method: string;
  status: string;
}

interface Props {
  applications: Application[];
}

export const TrackerTable: React.FC<Props> = ({ applications }) => {
  return (
    <table className="min-w-full text-left text-sm mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-2 py-2">Job Title</th>
          <th className="px-2 py-2">Company</th>
          <th className="px-2 py-2">Date</th>
          <th className="px-2 py-2">Method</th>
          <th className="px-2 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.id} className="border-b">
            <td className="px-2 py-1">{app.title}</td>
            <td className="px-2 py-1">{app.company}</td>
            <td className="px-2 py-1">{app.date}</td>
            <td className="px-2 py-1">{app.method}</td>
            <td className="px-2 py-1">
              <span
                className={`${app.status === 'Pending' ? 'text-yellow-600' : app.status === 'Interview' ? 'text-blue-600' : app.status === 'Offer' ? 'text-green-600' : 'text-red-600'}`}
              >
                {app.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
