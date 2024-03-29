import { child, getDatabase, push, ref, remove, set } from "firebase/database";
import { Chore } from "./model/chores";

const addObject = <T>(path: string, data: T) => {
  const db = getDatabase();
  const newKey = push(child(ref(db), path)).key;
  const newResourceRef = ref(db, `${path}/${newKey}`);
  set(newResourceRef, data);
};

const updateObject = <T>(path: string, data: T) => {
  const db = getDatabase();
  set(ref(db, path), data);
};

const removeObject = (path: string) => {
  const db = getDatabase();
  remove(ref(db, path));
};

export const addChore = (name: string, dueDate: Date) =>
  addObject("chores", {
    name,
    dueDate: dueDate.toISOString(),
    createdAt: new Date().toISOString(),
    completed: false,
  });

export const updateChore = (chore: Chore) => {
  const update = {
    name: chore.name,
    dueDate: chore.dueDate,
    createdAt: chore.createdAt,
    completed: chore.completed ?? false,
  };
  updateObject(`chores/${chore.id}`, update);
};

export const removeChore = (chore: Chore) => {
  removeObject(`chores/${chore.id}`);
};
