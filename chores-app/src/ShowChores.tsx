import "./AddChore.css";
import { Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useChores } from "./realtimeDatabase/useRealtimeArray";
import Loading from "./common/Loading";
import { ChangeEvent, useMemo } from "react";
import { updateChore } from "./realtimeDatabase/writeData";
import { Chore } from "./realtimeDatabase/model/chores";

const ShowChores = () => {
  const chores = useChores();
  const orderedChores = useMemo(
    () =>
      chores && chores.sort((c1, c2) => c1.dueDate.localeCompare(c2.dueDate)),
    [chores],
  );
  const updateChoreCompleted =
    (chore: Chore) => (e: ChangeEvent<HTMLInputElement>) =>
      updateChore({ ...chore, completed: e.target.checked });

  if (!orderedChores) return <Loading />;

  return (
    <div className="App">
      <Link to="/add">Add new chore</Link>
      {orderedChores.map((chore) => (
        <Card key={chore.id}>
          <Card.Body>
            <Card.Title>{chore.name}</Card.Title>
            <Card.Text>
              {new Date(chore.dueDate).toLocaleString("en-GB")}
            </Card.Text>
            <Form.Check>
              <Form.Check.Input
                type="checkbox"
                checked={chore.completed ?? false}
                onChange={updateChoreCompleted(chore)}
              ></Form.Check.Input>
              <Form.Check.Label>Done?</Form.Check.Label>
            </Form.Check>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ShowChores;
