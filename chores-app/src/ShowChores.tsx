import "./AddChore.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useChores } from "./realtimeDatabase/useRealtimeArray";
import Loading from "./common/Loading";
import { useMemo } from "react";

const ShowChores = () => {
  const chores = useChores();
  const orderedChores = useMemo(
    () =>
      chores && chores.sort((c1, c2) => c1.dueDate.localeCompare(c2.dueDate)),
    [chores],
  );

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
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ShowChores;
