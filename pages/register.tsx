import React, { useState } from 'react';

export default function Register() {
  // There is at least one vulnerabliity in this code (probably)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
          password,
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
      <h4>Don&apos;t forget your password! We haven&apos;t implemented resetting yet.</h4>
    </div>
  );
}
