import { Header } from "./components/header"
import { Tabs } from "./components/tabs"
import { TodoInput } from "./components/todoInput"
import { TodoList } from "./components/todoList"
import { useState, useEffect } from 'react' 


function App() {

  const [todos, setTodos] = useState([
    {input:'Hello! Add your first todo.', complete: true}
  ])

  const [selectedTab, setSelectedTab] = useState('Open')
  
  function handleSaveData(currTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }))
  }

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, { input: newTodo, complete: false }]
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleCompleteTodo(index) {
    // update/edit/modify tasks
    let newTodoList = [...todos] 
    let completedTodo = todos[index]
    completedTodo['complete'] = true
    newTodoList[index] = completedTodo
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) {
      return
    }
    let db = JSON.parse(localStorage.getItem('todo-app'))
    setTodos(db.todos)
  }, [])

  return (
    <>
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos} />
      <TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todos} />
      <TodoInput handleAddTodo={handleAddTodo}/>
    </>
  )
}

export default App
