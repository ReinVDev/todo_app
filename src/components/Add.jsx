import React from "react";
import { collection, addDoc } from "firebase/firestore";
import store from "../firebase/firebase.config";

const Add = ({ countTask, setReset, reset }) => {
  const addTask = async (e) => {
    e.preventDefault();
    if (e.target[0].value === " ") return;
    const docRef = await addDoc(collection(store, "tasks"), {
      index: countTask++,
      task: e.target[0].value,
      completed: false,
    });
    e.target[0].value = "";
    setReset(!reset);
    console.log(docRef)
  };
  return (
    <form className="add-task" onSubmit={addTask}>
      <label htmlFor="task"></label>
      <input
        type="text"
        id="task"
        placeholder="Create a New Task"
        autoFocus
        autoComplete="off"
        required
      />
    </form>
  );
};

export default Add;
