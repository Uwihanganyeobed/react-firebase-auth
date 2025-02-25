// src/App.tsx
import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged, User } from 'firebase/auth';
import AddBookForm from './components/AddBookForm';
import DeleteBookForm from './components/DeleteBookForm';
import UpdateBookForm from './components/UpdateBookForm';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiFirebaseFill } from "react-icons/ri";
import UploadFileForm from './components/UploadFileForm';
import ListFiles from './components/ListFiles';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        toast.success(`Welcome, ${user.email}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.info('Logged out successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(`Error: ${err.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleUnsubscribe = () => {
    setUser(null);
    toast.info('Unsubscribed from auth changes', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <ToastContainer />
      <h1 className="text-blue-500 text-3xl mb-10"> <a href='https://console.firebase.google.com/project/renderapi-7b268/firestore/databases/-default-/data/~2Fbooks~2F0P41puotvFDRnllXdOQt'><RiFirebaseFill color='orange' /></a> Book Management App</h1>
      {user ? (
        <>
          <div className="mb-6">
            <h2 className="text-2xl mb-4">Welcome, {user.email}</h2>
            <AddBookForm />
            <DeleteBookForm />
            <UpdateBookForm />
            <h2 className='text-2xl text-center text-purple-600'>Handling Files</h2>
            <UploadFileForm />
            <ListFiles />
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded mt-4 mr-2"
            >
              Logout
            </button>
            <button
              onClick={handleUnsubscribe}
              className="bg-yellow-500 text-white py-2 px-4 rounded mt-4"
            >
              Unsubscribe from Auth Changes
            </button>
          </div>
        </>
      ) : (
        <div className="w-80">
          <p className="text-red-500 mb-4">Please log in to manage books.</p>
          <SignUpForm />
          <LoginForm />
        </div>
      )}
    </div>
  );
};

export default App;