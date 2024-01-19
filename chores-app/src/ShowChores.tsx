import { get, getDatabase, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import "./AddChore.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

type Chores = {
  [choreId: string]: Chore;
};

type Chore = {
  name: string;
  dueDate: string;
};

const ShowChores = () => {
  const [chores, setChores] = useState<Chores>({});
  useEffect(() => {
    const getChores = async () => {
      const db = getDatabase();
      const snapshot = await get(query(ref(db, "chores")));
      setChores(snapshot.exists() ? snapshot.val() : {});
    };
    getChores();
  }, []);
  console.log(chores);
  return (
    <div className="App">
      <Link to="/add">Add new chore</Link>
      {Object.keys(chores).map((choreId) => (
        <Card>
          <Card.Body>
            <Card.Title>{chores[choreId].name}</Card.Title>
            <Card.Text>
              {new Date(chores[choreId].dueDate).toLocaleString()}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ShowChores;
