import { useEffect, useState } from 'react';
import axios from 'axios';

function useToDoApi() {
    const [result, setResult] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await axios({
            method: 'get',
            url: 'https://main--react-todo-hardik.netlify.app/todos/getTodo'
        });
        setResult(response.data.allTodos);
        console.log(response.data.allTodos);
    }


    const addTodo = async (newTodo) => {
        const response = await axios({
            method: 'post',
            url: 'https://main--react-todo-hardik.netlify.app/todos/addTodo',
            data: newTodo
        });
        console.log(response.data.message);
        fetchData();
    }

    const clearTodo = async () => {
        const response = await axios({
            method: 'delete',
            url: 'https://main--react-todo-hardik.netlify.app/todos/deleteAllTodo',
        });
        console.log(response.data.message);
        fetchData();
    }

    const deleteTodo = async (id) => {
        const response = await axios({
            method: 'delete',
            url: 'https://main--react-todo-hardik.netlify.app/todos/deleteTodo',
            data: { id }
        });
        console.log(response.data.message);
        fetchData();
    }

    const checkedTodo = async (updateChecked) => {
        const response = await axios({
            method: 'patch',
            url: 'https://main--react-todo-hardik.netlify.app/todos/updateTodoChecked',
            data: updateChecked
        });
        console.log(response.data.message);
        fetchData();
    }

    const updateTodo = async (updateTitle) => {
        const response = await axios({
            method: 'patch',
            url: 'https://main--react-todo-hardik.netlify.app/todos/updateTodo',
            data: updateTitle
        });
        console.log(response.data.message);
        fetchData();
    }
    // console.log(result)

    return [result, addTodo, clearTodo, deleteTodo, checkedTodo, updateTodo];
}

export default useToDoApi;