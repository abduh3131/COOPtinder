export function calculateMatch(resume: string, job: string): number {
  const resumeWords = new Set(resume.toLowerCase().split(/\W+/));
  const jobWords = new Set(job.toLowerCase().split(/\W+/));
  const overlap = Array.from(jobWords).filter((w) => resumeWords.has(w));
  const match = (overlap.length / jobWords.size) * 100;
  return Math.round(match);
}
