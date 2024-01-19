import React, { useEffect, useState } from "react";
import "./AddChore.css";
import { Button, Form } from "react-bootstrap";
import {
  child,
  get,
  getDatabase,
  push,
  query,
  ref,
  update,
} from "firebase/database";
import { Link } from "react-router-dom";

const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const todayAtTenPM = () => {
  const output = new Date();
  output.setHours(22, 0, 0);
  return output;
};

const addChore = async (name: string, dueDate: Date) => {
  const db = getDatabase();

  const chore = {
    name,
    dueDate,
    createdAt: new Date(),
  };

  const newChoreKey = push(child(ref(db), "chores")).key;
  const newChoreResource = `chores/${newChoreKey}`;

  const updates = { [newChoreResource]: chore };
  await update(ref(db), updates);
};

const AddChore = () => {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState(todayAtTenPM());
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addChore(name, dueDate);
  };
  return (
    <div className="App">
      <Link to="/">View to-do list</Link>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Due At:</Form.Label>
          <Form.Control
            type="datetime-local"
            value={convertToDateTimeLocalString(dueDate)}
            onChange={(e) => setDueDate(new Date(e.target.value))}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
};

export default AddChore;
