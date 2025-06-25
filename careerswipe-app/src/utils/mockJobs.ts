import { Job } from '../components/JobCard';

export const mockJobs: Job[] = [
  {
    id: 1,
    company: 'TD Bank',
    title: 'Frontend Developer',
    location: 'Toronto, ON',
    salary: '$90k - $110k',
    remote: true,
    tags: ['Full-time', 'Remote'],
    logo: '/td-logo.svg',
  },
  {
    id: 2,
    company: 'GreenTech',
    title: 'Data Analyst',
    location: 'Vancouver, BC',
    salary: '$80k - $95k',
    remote: false,
    tags: ['Urgent', 'Full-time'],
    logo: '/greentech-logo.svg',
  },
];
