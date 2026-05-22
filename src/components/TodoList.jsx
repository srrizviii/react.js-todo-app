import { TodoCard } from "./TodoCard";

export function TodoList(props) {
    const {todos, selectedTab} = props

    let filterTodosList 
    if (selectedTab === 'All') {
        filterTodosList = todos
    }else if (selectedTab === 'Completed'){
        filterTodosList = todos.filter(val => val.complete)
    }else {
        filterTodosList = todos.filter(val => !val.complete)
    }


    return (
        <>
            {filterTodosList.map((todo, todoIndex) => {
                return (
                    <TodoCard 
                        key={todoIndex} 
                        todoIndex = {todos.findIndex(val => val.input == todo.input)}
                        {...props} 
                        todo={todo} />
                )
            })}
        </>
    )
}