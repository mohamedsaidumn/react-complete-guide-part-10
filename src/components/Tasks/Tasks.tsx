import Section from "../UI/Section";
import TaskItem from "./TaskItem";
import { TaskType, HTTP_REQUEST_CONFIG } from "../../types";
import classes from "./Tasks.module.css";
import { ReactNode } from "react";

interface TasksProps {
  items: TaskType[];
  loading: boolean;
  error: string | null;
  onFetch: () => void;
}

const Tasks = (props: TasksProps) => {
  let taskList = <h2>No tasks found. Start adding some!</h2>;

  if (props.items.length > 0) {
    taskList = (
      <ul>
        {props.items.map((task) => (
          <TaskItem key={task.id}>{task.text}</TaskItem>
        ))}
      </ul>
    );
  }

  let content: ReactNode = taskList;

  if (props.error) {
    content = <button onClick={props.onFetch}>Try again</button>;
  }

  if (props.loading) {
    content = "Loading tasks...";
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default Tasks;
