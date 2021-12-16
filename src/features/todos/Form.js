import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addTodo, setIdEdit, updateTodo } from './todoSlice';

const getDateNow = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function Form({ todo }) {
    const [taskTitle, settaskTitle] = useState('');
    const [decription, setDecription] = useState('');
    const [dueDate, setDueDate] = useState(getDateNow());
    const [priority, setPriority] = useState('normal');
    const inputRef = useRef();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const todo = {
            id: uuidv4(),
            taskTitle,
            decription,
            dueDate,
            priority
        }

        dispatch(addTodo(todo));
        settaskTitle('');
        setDecription('');
        setDueDate(getDateNow());
        setPriority('normal');
        inputRef.current.focus();
    }

    const handleUpdate = () => {
        const todoUpdate = {
            id: todo.id,
            taskTitle,
            decription,
            dueDate,
            priority
        }
        dispatch(updateTodo(todoUpdate));
        dispatch(setIdEdit(null))
    }

    useEffect(() => {
        if (todo) {
            settaskTitle(todo.taskTitle);
            setDecription(todo.decription);
            setDueDate(todo.dueDate);
            setPriority(todo.priority);
        }
    }, [todo])

    useEffect(() => {
        if (!todo) {
            inputRef.current.focus();
        }
    }, [])

    return (
        <div className={todo ? "form" : "form form-add"} onSubmit={handleSubmit}>
            {todo ?
                null :
                <div className="form-title">
                    <h2>New Task</h2>
                </div>}
            <form className="form-content">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Add new task..."
                        value={taskTitle}
                        onChange={e => settaskTitle(e.target.value)}
                        required
                        ref={inputRef}
                    />
                </div>
                <div className="form-group">
                    <h4 className="input-name">Decription</h4>
                    <textarea
                        className="form-textarea"
                        value={decription}
                        onChange={e => setDecription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <div className="form-group__select">
                        <div className="form-group__due">
                            <h4 className="input-name">Due Date</h4>
                            <input
                                className="input-date"
                                type="date"
                                value={dueDate}
                                onChange={e => setDueDate(e.target.value)}
                                min={dueDate}
                            />
                        </div>
                        <div className="form-group__due">
                            <h4 className="input-name">Priority</h4>
                            <select
                                className="input-priority"
                                value={priority}
                                onChange={e => setPriority(e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value='normal'>Normal</option>
                                <option value='high'>High</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-button">
                        {todo ?
                            <button
                                type="button"
                                className="btn btn-submit"
                                onClick={handleUpdate}
                            >
                                Update
                            </button> :
                            <button type="submit" className="btn btn-submit">Add</button>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form
