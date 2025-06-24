'use client';
import React, { useState } from 'react';

export default function ProfilePage() {
  const [profile, setProfile] = useState({ name: '', email: '', location: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-4">Profile Setup</h1>
      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Full Name"
        name="name"
        value={profile.name}
        onChange={handleChange}
      />
      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Email"
        name="email"
        value={profile.email}
        onChange={handleChange}
      />
      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Location"
        name="location"
        value={profile.location}
        onChange={handleChange}
      />
    </div>
  );
}
