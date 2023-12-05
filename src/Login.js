// Import necessary dependencies from React and React Router
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Use useHistory to get access to the history object

  const handleLogin = async () => {
    try {
      const response = await fetch('https://afs.anyaudit.co.in/Userauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
       const data = await response.json();
       console.log(data,"ramya");
       const token = data.token;
       localStorage.setItem("token",token)
        // Handle successful login
        console.log('Login successful');

        // Redirect to the dashboard page
        navigate('/tasks');
      } else {
        // Handle login error
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  const navigate = useNavigate();

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
