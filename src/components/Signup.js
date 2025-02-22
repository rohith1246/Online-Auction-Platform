import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Signup.css'; // Importing external CSS file for styling

function Signup() {
  // State variables for storing user inputs and error messages
  const [username, setUsername] = useState(''); // Stores the entered username
  const [password, setPassword] = useState(''); // Stores the entered password
  const [role, setRole] = useState('user'); // Default role set to 'user'
  const [error, setError] = useState(''); // Stores error messages if any
  const navigate = useNavigate(); // Hook to navigate between pages

  // Function to handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    setError(''); // Reset error state before processing

    // Basic validation for empty fields
    if (!username || !password) {
      setError('Username and password are required'); // Show error message
      return; // Stop further execution
    }

    try {
      // Sending signup request to the backend API with user data
      const res = await axios.post('http://localhost:5001/signup', {
        username,
        password,
        role // Including role in the request payload
      });

      alert('Signup successful! Please sign in.'); // Success message
      navigate('/signin'); // Redirect to signin page after successful signup
    } catch (err) {
      console.error('Signup Error:', err.response?.data || err.message); // Log error
      setError(err.response?.data?.message || 'Signup failed. Please try again.'); // Show error message
    }
  };

  return (
    <div className="form-container"> {/* Container for styling */}
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>} {/* Display error messages if any */}
      <form onSubmit={handleSignup}> {/* Form element for user inputs */}
        
        {/* Input field for username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input-field" // Apply styles from CSS
        />

        {/* Input field for password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field" // Apply styles from CSS
        />

        {/* Dropdown for selecting role */}
        <select value={role} onChange={(e) => setRole(e.target.value)} className="dropdown"> 
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Signup button */}
        <button type="submit" className="signup-button">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
