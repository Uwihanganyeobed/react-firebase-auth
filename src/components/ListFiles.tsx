import React, { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db, storage } from '../../firebase/firebaseConfig';
import { deleteObject, ref } from 'firebase/storage';

interface FileData {
  id: string;
  name: string;
  url: string;
  createdAt: null;
  type: string;
}

const ListFiles: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'files'), (snapshot) => {
      const filesData: FileData[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FileData[];
      setFiles(filesData);
    });

    return () => unsub();
  }, []);

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  const handleDelete = async (fileId: string, fileName: string) => {
    try {
      // Delete file from Firebase Storage
      const fileRef = ref(storage, `files/${fileName}`);
      await deleteObject(fileRef);

      // Delete file metadata from Firestore
      const fileDocRef = doc(db, 'files', fileId);
      await deleteDoc(fileDocRef);

      toast.success('File deleted successfully!', {
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
        toast.error(`Error deleting file: ${err.message}`, {
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
    <div className="space-y-4">
      {files.map((file) => (
        <div key={file.id} className="flex justify-between items-center border-b pb-2">
          <div>
            <p>{file.name}</p>
            <small>{file.type}</small>
          </div>
          <div className="space-x-2">
            <button onClick={() => handleDownload(file.url)} className="bg-blue-500 text-white py-1 px-3 rounded">Download</button>
            <button onClick={() => handleDelete(file.id, file.name)} className="bg-red-500 text-white py-1 px-3 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListFiles;
