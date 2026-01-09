import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import TaskPage from "./components/TaskPage";
import { useState } from "react";

function App() {

  const [tasks, setTasks] = useState(() => {
    const loadedTasks = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("task")) {
        const task = JSON.parse(localStorage.getItem(key));
        loadedTasks.push({
          ...task,
          startDate: task.startDate ? new Date(task.startDate) : null,
          endDate: task.endDate ? new Date(task.endDate) : null,
        });
      }
    }

    return loadedTasks;
  });

  function deleteTask(taskId){
    setTasks(prev => prev.filter(task => task.id !== taskId));
    localStorage.removeItem(`task${taskId}`)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home tasks={tasks} setTasks={setTasks}  deleteTask={deleteTask}/>} />
        <Route path="/task/:id" element={<TaskPage setTasks={setTasks} deleteTask={deleteTask}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
