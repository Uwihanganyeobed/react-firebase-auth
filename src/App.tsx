// src/App.tsx
import React, { useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import AddBookForm from './components/AddBookForm';
import DeleteBookForm from './components/DeleteBookForm';
import UpdateBookForm from './components/UpdateBookForm';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth();

  // Monitor auth state changes
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  // Logout
  const handleLogout = () => {
    signOut(auth);
  };

  // Unsubscribe from auth changes
  const handleUnsubscribe = () => {
    setUser(null); // Clear user state
    auth.onAuthStateChanged(() => {}); // Detach the auth state change listener
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-blue-500 text-3xl mb-10">Getting Started with Firebase 9</h1>
      <AddBookForm />
      <DeleteBookForm />
      <UpdateBookForm />
      {user ? (
        <div>
          <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded mt-4">
            Logout
          </button>
          <button onClick={handleUnsubscribe} className="bg-yellow-500 text-white py-2 px-4 rounded mt-4">
            Unsubscribe from Auth Changes
          </button>
        </div>
      ) : (
        <>
          <SignUpForm />
          <LoginForm />
        </>
      )}
    </div>
  );
};

export default App;
