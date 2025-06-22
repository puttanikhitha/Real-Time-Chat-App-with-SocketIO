import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [typing, setTyping] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  const msgRef = useRef();

  useEffect(() => {
    socket.emit('joinRoom', user);

    socket.on('chatMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on('typing', ({ username }) => {
      setTyping(`${username} is typing...`);
    });

    socket.on('stopTyping', () => setTyping(''));

    socket.on('onlineUsers', (list) => {
      setOnlineUsers(list);
    });

    socket.on('userJoined', ({ username }) => {
      setMessages(prev => [...prev, { sender: 'System', content: `${username} joined` }]);
    });

    socket.on('userLeft', ({ username }) => {
      setMessages(prev => [...prev, { sender: 'System', content: `${username} left` }]);
    });

    return () => socket.disconnect();
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:5000/api/chat/${user.room}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMessages(res.data));
  }, [user]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    socket.emit('chatMessage', { room: user.room, username: user.username, message: msg });
    setMsg('');
    socket.emit('stopTyping', { room: user.room });
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Room: {user.room}</h3>
      <div className="text-sm text-gray-500 mb-1">Online: {onlineUsers.join(', ')}</div>

      <div className="h-64 overflow-y-auto border p-2 bg-gray-50 rounded">
        {messages.map((m, i) => (
          <div key={i} className="mb-1">
            <strong>{m.sender}</strong>: {m.content}
          </div>
        ))}
      </div>

      <p className="text-xs text-purple-500 mt-1">{typing}</p>

      <div className="flex gap-2 mt-2">
        <input
          ref={msgRef}
          className="flex-1 p-2 border rounded"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
            socket.emit('typing', { room: user.room, username: user.username });
          }}
          placeholder="Type a message"
        />
        <button
          className="bg-green-500 text-white px-4 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
