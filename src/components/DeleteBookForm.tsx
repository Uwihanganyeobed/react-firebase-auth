// src/DeleteBookForm.tsx
import React, { useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const DeleteBookForm: React.FC = () => {
  const [id, setId] = useState('');

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'books', id);
      await deleteDoc(docRef);
      setId('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleDelete} className="bg-white p-5 rounded shadow-md w-80">
      <label htmlFor="id" className="block mb-2 font-bold">Document ID:</label>
      <input
        type="text"
        id="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded w-full">Delete Book</button>
    </form>
  );
};

export default DeleteBookForm;
