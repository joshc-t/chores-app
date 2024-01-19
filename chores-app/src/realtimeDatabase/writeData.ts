import { child, getDatabase, push, ref, set } from "firebase/database";

const addObject = <T>(path: string, data: T) => {
  const db = getDatabase();
  const newKey = push(child(ref(db), path)).key;
  const newResourceRef = ref(db, `${path}/${newKey}`);
  set(newResourceRef, data);
};

export const addChore = (name: string, dueDate: Date) =>
  addObject("chores", {
    name,
    dueDate: dueDate.toISOString(),
    createdAt: new Date().toISOString(),
  });
