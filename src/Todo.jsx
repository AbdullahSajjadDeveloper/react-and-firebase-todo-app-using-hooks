import React, { Fragment, useState } from "react";
import {
  Modal,
  List,
  ListItem,
  ListItemText,
  Button,
  Input,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Todo = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.Todos.todo);

  const handleOpen = (event) => {
    setOpen(true);
  };

  const updateTodo = (event) => {
    db.collection("todos").doc(props.Todos.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <Fragment>
      <Modal open={open} onClose={(event) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>Edit Todo</h1>
          <form autoComplete="off" onSubmit={(event) => { event.preventDefault(); updateTodo(); }}>
          <FormControl>
            <InputLabel>Update Your Todo</InputLabel>
            <Input
              type="text"
              name="updateTodo"
              onChange={(event) => {
                setInput(event.target.value);
              }}
              value={input}
              color="primary"
            />
          </FormControl>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="submit" color="primary" variant="contained">
            Update Todo
          </Button>
          </form>
        </div>
      </Modal>
      <div>
        <List>
          <ListItem>
            <ListItemText primary={props.Todos.todo} secondary={"Todo"} />
          </ListItem>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              db.collection("todos").doc(props.Todos.id).delete();
            }}
          >
            <DeleteForeverIcon /> Delete Me
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => setOpen(true)}
          >
            <EditIcon /> Edit Me
          </Button>
        </List>
      </div>
    </Fragment>
  );
};

export default Todo;
