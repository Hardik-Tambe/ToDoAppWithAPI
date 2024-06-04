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
            url: 'https://todo-backend-3g3y.onrender.com/getTodo'
        });
        setResult(response.data.allTodos);
        console.log(response.data.allTodos);
    }


    const addTodo = async (newTodo) => {
        const response = await axios({
            method: 'post',
            url: 'https://todo-backend-3g3y.onrender.com/addTodo',
            data: newTodo
        });
        console.log(response.data.message);
        fetchData();
    }

    const clearTodo = async () => {
        const response = await axios({
            method: 'delete',
            url: 'https://todo-backend-3g3y.onrender.com/deleteAllTodo',
        });
        console.log(response.data.message);
        fetchData();
    }

    const deleteTodo = async (id) => {
        const response = await axios({
            method: 'delete',
            url: 'https://todo-backend-3g3y.onrender.com/deleteTodo',
            data: { id }
        });
        console.log(response.data.message);
        fetchData();
    }

    const checkedTodo = async (updateChecked) => {
        const response = await axios({
            method: 'patch',
            url: 'https://todo-backend-3g3y.onrender.com/updateTodoChecked',
            data: updateChecked
        });
        console.log(response.data.message);
        fetchData();
    }

    const updateTodo = async (updateTitle) => {
        const response = await axios({
            method: 'patch',
            url: 'https://todo-backend-3g3y.onrender.com/updateTodo',
            data: updateTitle
        });
        console.log(response.data.message);
        fetchData();
    }
    // console.log(result)

    return [result, addTodo, clearTodo, deleteTodo, checkedTodo, updateTodo];
}

export default useToDoApi;