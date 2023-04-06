import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import { TaskType } from "../../types";
import useHttp from "../../hooks/use-http";

interface NewTaskProps {
  onAddTask: (task: TaskType) => void;
}

const NewTask = (props: NewTaskProps) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText: string, taskData: any) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText: string) => {
    sendTaskRequest(
      {
        url: "https://react-http-160f2-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
