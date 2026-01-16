import React, { useState } from 'react';
import { UserRole } from './types';
import './Login.css';

interface LoginProps {
  onJoin: (name: string, role: UserRole, room: string) => void;
}

const Login: React.FC<LoginProps> = ({ onJoin }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('Staff');
  const [room, setRoom] = useState('Warehouse');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onJoin(name, role, room);
    }
  };

  return (
    <div className="login-container">
      <h1>Walkie-Talkie Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name"
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
            <option value="Manager">Manager</option>
            <option value="Shipper">Shipper</option>
            <option value="Cashier">Cashier</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        <div className="form-group">
          <label>Room</label>
          <select value={room} onChange={(e) => setRoom(e.target.value)}>
            <option value="Warehouse">Warehouse</option>
            <option value="Sales Floor">Sales Floor</option>
            <option value="Break Room">Break Room</option>
          </select>
        </div>

        <button type="submit" className="join-btn">Join Channel</button>
      </form>
    </div>
  );
};

export default Login;
