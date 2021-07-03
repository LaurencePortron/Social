import { useState, useEffect } from 'react';

export function useFirestoreDocument(ref, deps) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    return ref.onSnapshot((doc) => {
      setValue({ id: doc.id, data: doc.data() });
    });
  }, deps);

  return value;
}

export function useFirestoreCollection(ref, deps) {
  const [value, setValue] = useState([]);

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, data: doc.data() });
      });
      setValue(docs);
    });
  }, deps);

  return value;
}
