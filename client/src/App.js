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
    console.log(res.data);

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
      <h2>Your Tasks</h2>
      {tasks?.map((task) => (
        <div key={task.id} style={{ marginTop: 60 }}>
          <h4>{task.title}</h4>
          <h6>{task.created_at}</h6>
          <h5>{!task.completed ? 'Not Completed' : 'Completed'}</h5>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
