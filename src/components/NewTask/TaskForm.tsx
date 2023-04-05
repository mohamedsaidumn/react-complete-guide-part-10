import { FormEvent, useRef } from "react";

import classes from "./TaskForm.module.css";

interface TaskFormProps {
  loading: boolean;
  onEnterTask: (taskText: string) => void;
}
const TaskForm = (props: TaskFormProps) => {
  const taskInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (taskInputRef === null || taskInputRef.current === null) {
      return;
    }

    const enteredValue: string = taskInputRef.current.value;

    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type="text" ref={taskInputRef} />
      <button>{props.loading ? "Sending..." : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
