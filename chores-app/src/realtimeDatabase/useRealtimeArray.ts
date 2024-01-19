import { getDatabase, off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Chore } from "./model/chores";

const useRealtimeArray = <T>(path: string) => {
  const [data, setData] = useState<T[] | null>(null);
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, path);
    onValue(dataRef, (snapshot) => {
      const newData = snapshot.val();
      const newArray = Object.keys(newData).map((id) => ({
        id,
        ...newData[id],
      }));
      setData(newArray);
    });
    return () => off(dataRef);
  }, [path]);
  return data;
};

export const useChores = () => useRealtimeArray<Chore>("chores");
