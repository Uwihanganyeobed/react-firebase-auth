// src/UpdateBookForm.tsx
import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const UpdateBookForm: React.FC = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'books', id);
      await updateDoc(docRef, { title });
      setId('');
      setTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="bg-white p-5 rounded shadow-md w-80">
      <label htmlFor="id" className="block mb-2 font-bold">Document ID:</label>
      <input
        type="text"
        id="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <label htmlFor="title" className="block mb-2 font-bold">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded w-full">Update Book</button>
    </form>
  );
};

export default UpdateBookForm;
