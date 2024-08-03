import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const DeleteBookForm: React.FC = () => {
  const handleDeleteBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id } = e.target as typeof e.target & {
      id: { value: string };
    };

    try {
      const docRef = doc(db, 'books', id.value);
      await deleteDoc(docRef);
      toast.success('Book deleted successfully!', {
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
        toast.error(`Error deleting book: ${err.message}`, {
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
    <form onSubmit={handleDeleteBook}>
      <input type="text" name="id" placeholder="Document ID" required />
      <button type="submit">Delete Book</button>
    </form>
  );
};

export default DeleteBookForm;
