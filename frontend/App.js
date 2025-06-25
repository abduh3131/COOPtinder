import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from 'react-native';

const API_URL = 'http://localhost:8000';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [resume, setResume] = useState('');
  const [skills, setSkills] = useState('');
  const [job, setJob] = useState(null);

  const login = async () => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      const data = await res.json();
      setUserId(data.user_id);
      setLoggedIn(true);
      loadProfile(data.user_id);
    }
  };

  const loadProfile = async (uid) => {
    const res = await fetch(`${API_URL}/profile/${uid}`);
    if (res.ok) {
      const data = await res.json();
      setResume(data.resume || '');
      setSkills(data.skills || '');
    }
  };

  const saveProfile = async () => {
    await fetch(`${API_URL}/profile/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume, skills })
    });
  };

  const fetchJob = async () => {
    const res = await fetch(`${API_URL}/job/${userId}`);
    if (res.ok) {
      const data = await res.json();
      setJob(data.job);
    }
  };

  const swipe = async (decision) => {
    await fetch(`${API_URL}/swipe/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job, decision })
    });
    setJob(null);
    fetchJob();
  };

  if (!loggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Job Tinder</Text>
        <TextInput placeholder="Username" style={styles.input} onChangeText={setUsername} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword} />
        <Button title="Login" onPress={login} color="#006400" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <TextInput placeholder="Resume" style={styles.textArea} multiline value={resume} onChangeText={setResume} />
      <TextInput placeholder="Skills" style={styles.input} value={skills} onChangeText={setSkills} />
      <Button title="Save" onPress={saveProfile} color="#006400" />
      {job ? (
        <View style={styles.card}>
          <Text>{job}</Text>
          <View style={styles.row}>
            <Button title="Yes" onPress={() => swipe('yes')} color="#006400" />
            <Button title="No" onPress={() => swipe('no')} color="#aaaaaa" />
          </View>
        </View>
      ) : (
        <Button title="Load Job" onPress={fetchJob} color="#006400" />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#006400'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    width: '100%'
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    width: '100%',
    height: 100
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    marginTop: 20,
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  }
});
