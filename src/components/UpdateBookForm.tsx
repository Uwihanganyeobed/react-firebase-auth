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
        className: 'bg-blue-500 text-white',
        progressClassName: 'bg-blue-300',
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
    <form onSubmit={handleUpdateBook} className="bg-white p-5 rounded shadow-md w-80">
      <label htmlFor="id" className="block mb-2 font-bold text-gray-700">Document ID:</label>
      <input
        type="text"
        id="id"
        name="id"
        placeholder="Document ID"
        className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <label htmlFor="title" className="block mb-2 font-bold text-gray-700">New Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="New Title"
        className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">Update Book</button>
    </form>
  );
};

export default UpdateBookForm;
