import React, { useEffect, useState, useCallback, useMemo } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import { HTTP_REQUEST_CONFIG, TaskType } from "./types";
import useHttp from "./hooks/use-http";

function App() {
  console.log("APP Running");
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (tasksObj: any) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    const conFig: HTTP_REQUEST_CONFIG = {
      url: "https://react-http-160f2-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
    };

    fetchTasks(conFig, transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task: TaskType) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks items={tasks} loading={isLoading} error={error} />
    </React.Fragment>
  );
}

export default App;
