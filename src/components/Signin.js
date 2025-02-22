import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5001/signin', { username, password , role});
      console.log('Signin Response:', res.data);

      if (res.data.token) {
        localStorage.setItem('authToken', res.data.token);
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Signin Request Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Signin</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
           <select value={role} onChange={(e) => setRole(e.target.value)} className="dropdown"> 
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Signin</button>
      </form>
    </div>
  );
}

export default Signin;
