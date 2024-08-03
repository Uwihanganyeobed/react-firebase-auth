import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const AddBookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    const books =  await addDoc(collection(db, "books"), {
        title,
        author,
        createdAt: serverTimestamp(),
      });
      console.log(books)
      setTitle('');
      setAuthor('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow-md w-80">
      <label htmlFor="title" className="block mb-2 font-bold">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <label htmlFor="author" className="block mb-2 font-bold">Author:</label>
      <input
        type="text"
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">Add a new book</button>
    </form>
  );
};

export default AddBookForm;
