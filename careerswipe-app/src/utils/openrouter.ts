export async function optimizeResume(resume: string, job: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  if (!apiKey) {
    console.warn('OpenRouter API key missing');
    return resume;
  }
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that optimizes resumes for job descriptions.' },
          { role: 'user', content: `Job Description:\n${job}` },
          { role: 'user', content: `Resume:\n${resume}` },
          { role: 'user', content: 'Return the improved resume.' },
        ],
      }),
    });
    const data = await response.json();
    return data.choices?.[0]?.message?.content || resume;
  } catch (err) {
    console.error(err);
    return resume;
  }
}
