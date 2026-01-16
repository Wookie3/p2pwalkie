import React, { useState } from 'react';
import Login from './Login';
import WalkieTalkie from './WalkieTalkie';
import { UserRole } from './types';
import './App.css';

function App() {
  const [user, setUser] = useState<{ name: string; role: UserRole; room: string } | null>(null);

  const handleJoin = (name: string, role: UserRole, room: string) => {
    setUser({ name, role, room });
  };

  return (
    <div className="App">
      {!user ? (
        <Login onJoin={handleJoin} />
      ) : (
        <WalkieTalkie user={user} />
      )}
    </div>
  );
}

export default App;