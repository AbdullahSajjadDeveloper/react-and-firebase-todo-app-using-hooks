import React, { Fragment, useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Styling from "./App.module.css";
import db from "./firebase";
import Todo from "./Todo";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: new Date(),
    });
    setInput("");
  };

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((data) => {
            return {
              id: data.id,
              todo: data.data().todo,
              timestamp: data.data().timestamp,
            };
          })
        );
      });
  }, []);

  return (
    <Fragment>
      <div className={Styling.heading}>
        <h1>
          This Is A Todo App!!! Made By Abdullah Sajjad!!!{" "}
          <span role="img">🚀</span>
        </h1>
        <form autoComplete="off" onSubmit={addTodo}>
          <FormControl>
            <InputLabel>Enter Todo</InputLabel>
            <Input
              className={Styling.heading}
              type="text"
              placeholder="Enter Your Todo"
              name="todo"
              onChange={(event) => {
                setInput(event.target.value);
              }}
              value={input}
              color="primary"
            />
          </FormControl>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            className={Styling.heading}
            disabled={!input}
            type="submit"
            variant="contained"
            color="primary"
          >
            Save Todo
          </Button>
        </form>
          <div>
            {todos.map((todo) => (
              <ul key={todo.id}>
                <Todo Todos={todo} />
              </ul>
            ))}
          </div>
      </div>
    </Fragment>
  );
};

export default App;
