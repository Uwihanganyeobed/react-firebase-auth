import React from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const UpdateBookForm: React.FC = () => {
  const handleUpdateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, title } = e.target as typeof e.target & {
      id: { value: string };
      title: { value: string };
    };

    try {
      const docRef = doc(db, 'books', id.value);
      await updateDoc(docRef, {
        title: title.value,
      });
      toast.success('Book updated successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Error updating book: ${err.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('An unknown error occurred.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <form onSubmit={handleUpdateBook}>
      <input type="text" name="id" placeholder="Document ID" required />
      <input type="text" name="title" placeholder="New Title" required />
      <button type="submit">Update Book</button>
    </form>
  );
};

export default UpdateBookForm;
