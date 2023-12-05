import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pan, setPan] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [panError, setPanError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Validate password and confirm password match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Validate password criteria
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    }

    // Validate PAN format
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (!panRegex.test(pan)) {
      setPanError('Invalid PAN format');
      return;
    }

    // Reset errors
    setPasswordError('');
    setEmailError('');
    setPanError('');

    // Add your registration logic here
    console.log('Registering:', { username, email, pan, password });

    // Reset the form fields
    setUsername('');
    setEmail('');
    setPan('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="container">
      <div className='row'>
        <div className='col-md-6'>
        <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br/>
<label htmlFor="email">email:</label> <br/>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>
        {emailError && <p className="error-message">{emailError}</p>}

        <label htmlFor="pan">PAN:</label><br/>
        <input
          type="text"
          id="pan"
          name="pan"
          value={pan}
          onChange={(e) => setPan(e.target.value)}
          required
        />
        {panError && <p className="error-message">{panError}</p>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {passwordError && <p className="error-message">{passwordError}</p>}

        <div className='submit'>
          <button type="submit">Register</button>
        </div><br/>
      </form>
      </div>
      <div className="col-md-6">
        {/* {submitted && ( */}
          <div className="transaction-history-table">
            <h2>Registration Details</h2>
            <table>
              <tbody>
                <tr>
                  <td>Username:</td>
                  <td>{username}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{email}</td>
                </tr>
                <tr>
                  <td>PAN:</td>
                  <td>{pan}</td>
                </tr>
                {/* Add more fields as needed */}
              </tbody>
            </table>
          </div>
        {/* )} */}
      </div>
      </div>
    </div>
  );
};

export default Register;
