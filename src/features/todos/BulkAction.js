import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from './todoSlice';

function BulkAction({ idTodosChecked, setIdTodosChecked }) {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.list);

    const handleRemoveAllChecked = (idTodosChecked) => {
        if (window.confirm('Are you sure you want to remove')) {
            const todosRemaining = todos.filter(todo => idTodosChecked.includes(todo.id) ? false : true)
            dispatch(setTodos(todosRemaining));
            setIdTodosChecked([]);
        }
    }

    return (
        <div className="controll-items">
            <div>
                <span>Bulk Action</span>
            </div>
            <div>
                <button className="btn btn-done">Done</button>
                <button
                    className="btn btn-remove"
                    onClick={() => handleRemoveAllChecked(idTodosChecked)}
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default BulkAction
