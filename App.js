import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-Blue via-Purple to-softPink font-sans">
      <div className="w-full max-w-md p-6 bg-white/30 backdrop-blur-md rounded-xl shadow-lg">
        {!user ? <Login onLogin={setUser} /> : <Chat user={user} />}
      </div>
    </div>
  );
}

export default App;
