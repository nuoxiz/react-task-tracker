import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTasks from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

// import { router } from "json-server";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState("");
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    //fetch return a Promise
    const data = await res.json();
    return data;
  };
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    //fetch return a Promise
    const data = await res.json();
    return data;
  };
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await res.json(); // data returned is just the data added into the server
    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
    tasks.forEach((task) => console.log(task.text));
  };
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`https://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) => {
        task.id === id ? { ...task, reminder: data.reminder } : task;
      })
    );
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route
          path="/"
          exact
          render={() => {
            <>
              {/* && is a shoter way of doing ternary logic without the else */}
              {showAddTask && <AddTasks onAdd={addTask} />}
              {tasks.length === 0 ? (
                "No Task!"
              ) : (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              )}
            </>;
          }}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
