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
        className: 'bg-green-500 text-white',
        progressClassName: 'bg-green-300',
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
          className: 'bg-red-500 text-white',
          progressClassName: 'bg-red-300',
        });
      } else {
        toast.error('An unknown error occurred.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-red-500 text-white',
          progressClassName: 'bg-red-300',
        });
      }
    }
  };

  return (
    <form onSubmit={handleDeleteBook} className="bg-white p-5 rounded shadow-md w-80">
      <label htmlFor="id" className="block mb-2 font-bold text-gray-700">Document ID:</label>
      <input
        type="text"
        id="id"
        name="id"
        placeholder="Document ID"
        className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      />
      <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-full">Delete Book</button>
    </form>
  );
};

export default DeleteBookForm;
