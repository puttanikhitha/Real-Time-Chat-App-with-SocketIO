import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const handleLogin = async () => {
    if (!username || !room) return alert("Enter username and room");

    const res = await axios.post('http://localhost:5000/api/auth/login', { username });
    localStorage.setItem('token', res.data.token);

    onLogin({ username: res.data.username, room });
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-80">
      <h2 className="text-2xl font-bold mb-4 text-center">Join Chat</h2>
      <input
        type="text"
        placeholder="Username"
        className="w-full mb-3 p-2 border rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room"
        className="w-full mb-4 p-2 border rounded"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={handleLogin}
      >
        Join Room
      </button>
    </div>
  );
}

export default Login;
