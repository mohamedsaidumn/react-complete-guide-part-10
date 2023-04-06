import React, { useEffect, useState, useCallback, useMemo } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import { HTTP_REQUEST_CONFIG, TaskType } from "./types";
import useHttp from "./hooks/use-http";

function App() {
  console.log("APP Running");
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const transformTasks = useCallback(
    (tasksObj: any) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    },
    [setTasks]
  );

  const conFig: HTTP_REQUEST_CONFIG = useMemo(() => {
    return {
      url: "https://react-http-160f2-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
    };
  }, []);

  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useHttp(conFig, transformTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const taskAddHandler = (task: TaskType) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
