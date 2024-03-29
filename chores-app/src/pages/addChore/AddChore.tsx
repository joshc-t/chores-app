import React, { useState } from "react";
import "../Page.css";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addChore, updateChore } from "../../realtimeDatabase/writeData";
import { useChore } from "../../realtimeDatabase/useRealtimeObject";
import { Chore } from "../../realtimeDatabase/model/chores";
import Loading from "../../common/Loading";

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

const AddOrEditChore = ({ initialChore }: { initialChore: Chore | null }) => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(initialChore?.name ?? "");
  const [dueDate, setDueDate] = useState(
    initialChore ? new Date(initialChore.dueDate) : todayAtTenPM(),
  );
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSaving(true);
    e.preventDefault();
    if (initialChore) {
      updateChore({ ...initialChore, name, dueDate: dueDate.toISOString() });
    } else {
      addChore(name, dueDate);
    }
    setSaving(false);
    navigate("/");
  };
  return (
    <div className="Page">
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
        <Button type="submit" disabled={saving}>
          {saving ? "Saving" : "Save"}
        </Button>
      </Form>
    </div>
  );
};

export const EditChore = () => {
  const { choreId } = useParams();
  const initialChore = useChore(choreId!);
  return initialChore ? (
    <AddOrEditChore initialChore={initialChore} />
  ) : (
    <Loading />
  );
};

export const AddChore = () => <AddOrEditChore initialChore={null} />;
