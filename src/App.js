import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

const URL = 'http://localhost/todo/index.php'

function App() {

  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')

  useEffect(() => {
    axios.get(URL)
    .then((response) => {
     // console.log(response.data);
      setTasks(response.data)
    }).catch(error => {
      alert(error.response ? error.response.data.error : error)
    })
  }, [])

  function save(e) {
    e.preventDefault()
    const json = JSON.stringify({description:task})
    axios.post(URL + 'add.php', json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setTasks(tasks => [...tasks,response.data])
      setTask('')
    }).catch (error => {
      alert(error.response.data.error)
    })
  }

  return (
    <div className='container'>
      <h3>Todo list</h3>
      <form onSubmit={save}>
        <label>New task</label>
        <input value={task} onChange={e => setTask(e.target.value)}></input>
        <button>Save</button>

      </form>
     <ol>
      {tasks?.map(task => (
        <li key={task.id}>{task.description}</li>
      ))}
     </ol>
    </div>
  );
}

export default App;
