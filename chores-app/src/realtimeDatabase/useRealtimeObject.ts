import { getDatabase, off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Chore } from "./model/chores";

const useRealtimeObject = <T>(id: string, pathRoot: string) => {
  const path = `${pathRoot}/${id}`;
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, path);
    onValue(dataRef, (snapshot) => {
      const newData = snapshot.val();
      if (newData) {
        const newChore = { id, ...newData };
        setData(newChore);
      }
    });
    return () => off(dataRef);
  }, [id, path]);
  return data;
};

export const useChore = (choreId: string) => useRealtimeObject<Chore>(choreId, "chores");
