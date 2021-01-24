
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Componets/Header';
import Tasks from './Componets/Tasks';
import AddTask from './Componets/AddTask';
import Footer from './Componets/Footer';
import About from './Componets/About';


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState  ([])

  useEffect (() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
  

    getTasks()
  }, [])

  //fetch tasks

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/ ${id}`)
    const data = await res.json()
    return data
  }

//Add Task

const addTask = async (item) => {
  const res = await fetch ('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(item)
  })

  const data = await res.json()
  setTasks([...tasks,data ])

//const id = Math.floor(Math.random() *10000) + 1
//const newTask = {id, ...item}
//setTasks([...tasks, newTask])

}

//Delete Tasks

const deleteTasks = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })

 setTasks(tasks.filter((item) =>item.id !==id))
}

//Toggle Reminder

const toggleReminder =async (id) => {

const taskToToggle = await fetchTask(id)
const updTask = {...taskToToggle,reminder: !taskToToggle.reminder }
const res = await fetch(`http://localhost:5000/tasks/${id}`, {
  method: 'PUT',
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(updTask)
})

const data = await res.json()

  setTasks(tasks.map((item) =>item.id === id ? {...item, reminder:data.reminder} : item))

}
  return (   
  <Router>
    <div className="container">
    <Header onAdd = {() =>setShowAddTask(!showAddTask)} showAdd = {showAddTask} />

    <Route 
    path = '/' exact render = {(props) =>(
      <>
 { showAddTask && <AddTask onAdd = {addTask} />}
      {tasks.length >0? <Tasks tasks = {tasks} onDelete = {deleteTasks} onToggle={toggleReminder} /> : 'No Tasks to Show'}
      </>
      
    )} />
 
    
   
     
     
      <Route path = '/about' component ={About}  />
   <Footer />
    </div>
    </Router>
  );
}


export default App;
