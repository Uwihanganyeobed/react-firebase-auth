import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const AddBookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'books'), {
        title,
        author,
        createdAt: serverTimestamp(),
      });
      toast.success('Book added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTitle('');
      setAuthor('');
    } catch (err) {
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
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <label htmlFor="title" className="block mb-2 font-bold">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        required
      />
      <label htmlFor="author" className="block mb-2 font-bold">Author:</label>
      <input
        type="text"
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;