import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/todo/tasks');

      setTasks(res.data);

      setLoading(false);
    };

    fetchData();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();

    const res = await axios.post('/todo/new-task/', { title: newTask });

    if (res.data.status === 200) {
      setNewTask('');
      setTasks([...tasks, res.data.task]);
    }
  };

  const deleteTask = async (id) => {
    const res = await axios.delete(`/todo/delete-task/${id}`);

    if (res.data.status === 200) {
      setTasks(tasks.filter((task) => id !== task.id));
    }
  };

  const markAsComplete = async (task) => {
    await axios.put(`/todo/edit-task/${task.id}/`, {
      id: task.id,
      title: task.title,
      completed: true,
      created_at: task.created_at,
    });

    setTasks(
      tasks.map((task2) =>
        task2.id === task.id ? { ...task2, completed: true } : task2
      )
    );
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className='cont'>
      <h1>Django React Todo</h1>
      <hr />
      <h3>Add New Task</h3>
      <form onSubmit={addTask}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
        <button type='submit'>Add Task</button>
      </form>
      <hr />
      <div
        style={{
          display: 'flex',
        }}
      >
        <div>
          <h2>Your Tasks</h2>
          {tasks.map(
            (task) =>
              !task.completed && (
                <div key={task.id} style={{ marginTop: 60 }}>
                  <h4>{task.title}</h4>
                  <h6>{task.created_at}</h6>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                  <button onClick={() => markAsComplete(task)}>
                    Mark As Complete
                  </button>
                </div>
              )
          )}
        </div>
        <div style={{ marginLeft: '30%' }}>
          <h2>Your completed tasks</h2>
          {tasks.map(
            (task) =>
              task.completed && (
                <div key={task.id} style={{ marginTop: 60 }}>
                  <h4>{task.title}</h4>
                  <h6>{task.created_at}</h6>
                  <h5>Completed</h5>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
