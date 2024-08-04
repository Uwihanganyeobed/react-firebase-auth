import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const UploadFileForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      const storageRef = ref(storage, `files/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'files'), {
        name: file.name,
        url: downloadURL,
        createdAt: serverTimestamp(),
        type: file.type,
      });

      toast.success('File uploaded successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'bg-green-500 text-white',
        progressClassName: 'bg-green-300',
      });
      setFile(null);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Error uploading file: ${err.message}`, {
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
    <form onSubmit={handleUpload} className="flex flex-col space-y-4">
      <input type="file" onChange={handleFileChange} className="file-input" />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Upload File</button>
    </form>
  );
};

export default UploadFileForm;
