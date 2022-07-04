import React, {useState, useEffect} from 'react'
import './App.css';
import Axios from 'axios'

function App() {

  const [newTask, setNewTask] =useState("")
  const [readTask, setReadTask] =useState([])
  const [updateTask, setUpdateTask] =useState("")

  // Create a new task
  const createTask = () => {
    console.log(newTask)
    Axios.post("https://merncrudappapi.herokuapp.com/create", {
      newTask:newTask
    })
  }

  // Read the task
  useEffect(() => {
    Axios.get("https://merncrudappapi.herokuapp.com/read").then((response) => {
      setReadTask(response.data)
    })
  })

  // Update the Task
  const updateTheTask = (id) => {
    Axios.put("https://merncrudappapi.herokuapp.com/update", {
      id:id,
      updateTask:updateTask
    })
    console.log(updateTask)
  }

  // Delete the Task
  const deleteTask = (id) => {
    Axios.delete(`https://merncrudappapi.herokuapp.com/delete/${id}`)
  }


  return (
    <div className="App">
      <div className="todos">
        <h1>TODOS App</h1>
        <h3>Add your todays task below</h3>
        <br /><br />
        <input onChange={(event) => setNewTask(event.target.value)} className="ip" type="text" placeholder="Enter Your Task Here" />
        <br /><br />
        <button onClick={createTask} className="btn btn-success">Add To List</button>
      </div>
      <br /><br />
      <h2>Created TODO'S</h2>
      <br /><br />
      {
      readTask.map((val,key) => {
        return(
          <div key={key} className="read">
            <h3>{val.task}</h3>
            <br /><br />
            <input onChange={(event) => setUpdateTask(event.target.value)} className="uip" type="text" placeholder="Update the Task" />
            <button onClick={() => updateTheTask(val._id)} className="btn btn-primary">Update</button>
            <br /><br />
            <button onClick={() => deleteTask(val._id)} className="btn btn-danger">Delete</button>
          </div>
        )
      })
      }
    </div>
  );
}

export default App;
