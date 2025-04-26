import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);

  //Recuperer les taches
  const fetchTasks = async () => {
    try {
      const response = await fetch('htpp://localhost:5000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erreur lors du chargement des taches :', error);
    }
  };

  //Charger les taches
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{padding: '2rem'}}>
      <h1>Ma To-Do List</h1>
      <ul>
        {tasks.length === 0 ? (
          <p>Aucune tache pour le moment.</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id}>
              {task.title} {task.completed ? 'YES' : 'NO'}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
