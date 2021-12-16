import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchTask } from './todoSlice';

function SearchTodoByTitle() {
    const todos = useSelector(state => state.todos.list);
    const [searchTodo, setSearchTodo] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const list = todos.filter(todo => {
            if (searchTodo.trim() === '') {
                return true;
            }
            return todo.taskTitle.toLowerCase().indexOf(searchTodo.toLowerCase()) !== -1;
        })

        dispatch(searchTask(list));
    }, [searchTodo])

    return (
        <div>
            <input
                className="form-input"
                value={searchTodo}
                onChange={e => setSearchTodo(e.target.value)}
                placeholder='Search task by title...'
            />
        </div>
    )
}

export default SearchTodoByTitle
