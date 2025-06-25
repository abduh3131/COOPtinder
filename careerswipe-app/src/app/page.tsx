import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text p-6">
      <h1 className="text-3xl font-bold text-primary mb-4">CareerSwipe</h1>
      <p className="text-center max-w-md mb-6">
        Swipe through jobs, optimize your resume with AI, and track your applications effortlessly.
      </p>
      <Link href="swipe/" className="bg-primary text-white px-6 py-3 rounded-full">
        Get Started
      </Link>
    </div>
  );
}
