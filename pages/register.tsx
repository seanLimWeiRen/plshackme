import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

export default function Register() {
  // There is at least one vulnerabliity in this code (probably)
  // Also, the setErrorMessage functiond doesn't work. idk why
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const passwordHash = bcrypt.hashSync(password)

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          passwordHash,
        }),
      });

      if (response.ok) {
        const result = await response.json()
        console.log(result.result)
        setErrorMessage(result.result)
      }else{
        setErrorMessage("Something went wrong!")
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred during registration.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={e => {
          e.preventDefault()
          handleRegister()
        }}>
          Register
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
