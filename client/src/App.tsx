import { useState, useEffect } from 'react';
import Axios from 'axios';

interface TasksInterface {
  id: number;
  title: string;
  completed: boolean;
  created_at: Date;
}

function App() {
  const [tasks, setTasks] = useState<Array<TasksInterface> | null>([]);
  const [loading, setLoading] = useState<boolean | null>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get('/todo/tasks');

      setTasks(res.data);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className='cont'>
      <h1>Django React Todo</h1>
      <hr />
      <h2>Your Tasks</h2>
      {tasks?.map((task) => (
        <div key={task.id} style={{ marginTop: 60 }}>
          <h4>{task.title}</h4>
          <h6>{task.created_at}</h6>
          <h5>{!task.completed ? 'Not Completed' : 'Completed'}</h5>
        </div>
      ))}
    </div>
  );
}

export default App;
