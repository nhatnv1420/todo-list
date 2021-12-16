import React from 'react';
import Form from './Form';
import Todos from './Todos';

function index() {
    return (
        <div className="task-manage">
            <Form />
            <Todos />
        </div>
    )
}

export default index
