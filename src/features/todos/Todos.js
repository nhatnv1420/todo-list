import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BulkAction from './BulkAction';
import SearchTodo from './SearchTodoByTitle';
import Todo from './Todo';
import { setTodos } from './todoSlice';

function Todos() {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.list);
    const searchTask = useSelector(state => state.todos.searchTask);
    const [idTodosChecked, setIdTodosChecked] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const todosLocal = JSON.parse(localStorage.getItem('todos'));
        if (todosLocal) {
            dispatch(setTodos(todosLocal));
        }
    }, [])

    useEffect(() => {
        setTasks(searchTask);
    }, [searchTask])

    useEffect(() => {
        setTasks(todos);
        const clear = setTimeout(() => {
            localStorage.setItem('todos', JSON.stringify(todos));
        }, 500)

        return () => {
            clearTimeout(clear);
        }
    }, [todos])

    return (
        <div className="list">
            <SearchTodo />
            <ul className="task-list">
                {tasks.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        idTodosChecked={idTodosChecked}
                        setIdTodosChecked={setIdTodosChecked}
                    />
                ))}
            </ul>
            {idTodosChecked.length > 0 &&
                <BulkAction
                    idTodosChecked={idTodosChecked}
                    setIdTodosChecked={setIdTodosChecked}
                />}
        </div>
    )
}

export default Todos
