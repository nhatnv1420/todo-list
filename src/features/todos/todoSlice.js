import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        list: [],
        idEdit: null,
        searchTask: []
    },
    reducers: {
        setTodos(state, action) {
            state.list = action.payload;
        },
        addTodo(state, action) {
            state.list.push(action.payload);
        },
        removeTodo(state, action) {
            const indexRemove = state.list.findIndex(todo => todo.id === action.payload);
            state.list.splice(indexRemove, 1);
        },
        updateTodo(state, action) {
            const indexUpdate = state.list.findIndex(todo => todo.id === action.payload.id);
            state.list.splice(indexUpdate, 1, action.payload);
        },
        setIdEdit(state, action) {
            state.idEdit = action.payload;
        },
        searchTask(state, action) {
            state.searchTask = action.payload;
        }
    }
});

export default todoSlice.reducer
export const { setTodos, addTodo, removeTodo, setIdEdit, updateTodo, searchTask } = todoSlice.actions