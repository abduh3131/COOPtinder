import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';

const API_URL = 'http://localhost:3000';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [resume, setResume] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' or 'register'

  const submitAuth = async () => {
    const endpoint = mode === 'login' ? '/login' : '/register';
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      setLoggedIn(true);
    } else {
      alert('Authentication failed');
    }
  };

  const saveResume = async () => {
    await fetch(`${API_URL}/resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, resume })
    });
  };

  const getRecommendations = async () => {
    const res = await fetch(`${API_URL}/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });
    const data = await res.json();
    setJobs(data.jobs || []);
  };

  if (!loggedIn) {
    return (
      <View style={{ padding: 40 }}>
        <Text>{mode === 'login' ? 'Login' : 'Register'}</Text>
        <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={{ borderWidth: 1, marginBottom: 10 }} />
        <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 10 }} />
        <Button title={mode === 'login' ? 'Login' : 'Register'} onPress={submitAuth} />
        <Button title={`Switch to ${mode === 'login' ? 'Register' : 'Login'}`} onPress={() => setMode(mode === 'login' ? 'register' : 'login')} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 40 }}>
      <Text>Welcome, {username}</Text>
      <Text>Resume:</Text>
      <TextInput
        multiline
        numberOfLines={6}
        style={{ borderWidth: 1, marginBottom: 10 }}
        value={resume}
        onChangeText={setResume}
      />
      <Button title="Save Resume" onPress={saveResume} />
      <Button title="Get Job Recommendations" onPress={getRecommendations} />
      {jobs.map((job, idx) => (
        <Text key={idx} style={{ marginTop: 10 }}>{job}</Text>
      ))}
    </ScrollView>
  );
}
