import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';
import { removeTodo, setIdEdit } from './todoSlice';

function Todo({ todo, idTodosChecked, setIdTodosChecked }) {
    const dispatch = useDispatch();
    const idEdit = useSelector(state => state.todos.idEdit);

    const handleChangeChecked = (id) => {
        const idExist = idTodosChecked.includes(id);
        if (idExist) {
            setIdTodosChecked(() => {
                return idTodosChecked.filter(item => item !== id)
            })
        } else {
            setIdTodosChecked([...idTodosChecked, id])
        }
    }

    const handleRemove = (id) => {
        if (window.confirm('Are you sure remove')) {
            dispatch(removeTodo(id));
        }
    }

    return (
        <li className="task-item" key={todo.id}>
            <div className="task-content">
                <div className="task-name">
                    <input
                        type="checkbox"
                        onChange={() => handleChangeChecked(todo.id)}
                        checked={idTodosChecked.includes(todo.id)}
                    />
                    <span>{todo.taskTitle}</span>
                </div>
                <div className="task-controll">
                    <button
                        className="btn btn-detail"
                        onClick={() => dispatch(setIdEdit(todo.id))}
                    >
                        Detail
                    </button>
                    <button
                        className="btn btn-remove"
                        onClick={() => handleRemove(todo.id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
            {idEdit === todo.id && <Form todo={todo} />}
        </li>
    )
}

export default Todo
