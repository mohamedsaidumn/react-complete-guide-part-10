import { ReactNode } from "react";
import classes from "./TaskItem.module.css";

interface TaskItemProps {
  children: ReactNode;
}
const TaskItem = (props: TaskItemProps) => {
  return <li className={classes.task}>{props.children}</li>;
};

export default TaskItem;
