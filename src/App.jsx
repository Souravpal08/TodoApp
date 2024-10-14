import { useState, useEffect } from 'react'
import { ToDoProvider } from './context'
import { TodoForm } from './components'
import TodoItem from './components/Todoitem'
import logoTodo from './image/logoTodo.png'

function App() {
const [todos, setTodos] = useState([])

const addTodo = (todo) => {
    setTodos((prev)=> [{id: Date.now(),...todo},...prev])
}

const updateTodo = (id, updatedTodo) => {
    console.log(id, updatedTodo);
    
    setTodos((prev) =>
        prev.map((prevTodo) =>
            prevTodo.id === id ? { ...prevTodo, ...updatedTodo } : prevTodo
        )
    );
};


const deleteTodo = (id) => {
    setTodos((prev)=> prev.filter((prevTodo)=> prevTodo.id !== id))
}

const toggleComplete = (id) => {
    setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
}

useEffect(() => {
    //concept of localstorage
    const todos = JSON.parse(localStorage.getItem('todos'))
    if(todos && todos.length > 0) {
        setTodos(todos)
    }  
}, [])

useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
}, [todos])



  return (
    <ToDoProvider value={{todos,addTodo,deleteTodo,updateTodo,toggleComplete}} >
    <div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-xl rounded-lg px-4 py-3 text-white">
    <div className='absolute top-4 left-10'>
        <img src={logoTodo} alt="logo" className="w-20 h-20 mx-auto" />
    </div>
        <h1 className="text-3xl font-bold text-center mb-8 mt-2">Manage Todo</h1>
        <h3 className="text-xl  text-center mb-4 ">List your all day task here </h3>
        <div className="mb-4">
            {/* Todo form goes here */} 
            <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>(
               <div key={todo.id} className='w-full'> 
                      <TodoItem todo={todo} />
                </div>
            ))}
        </div>
    </div>
</div>
</ToDoProvider>
  )
}

export default App
