// src/SignUpForm.tsx
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="bg-white p-5 rounded shadow-md w-80">
      <label htmlFor="email" className="block mb-2 font-bold">Email:</label>
      <input
        type="email"
        id="email"
        placeholder='abc@example.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <label htmlFor="password" className="block mb-2 font-bold">Password:</label>
      <input
        type="password"
        id="password"
        placeholder='abcdefz'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
