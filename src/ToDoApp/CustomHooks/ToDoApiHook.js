import { useEffect, useState } from 'react';
import axios from 'axios';

function useToDoApi() {
    const [result, setResult] = useState([]);

    async function fetchData() {
        const response = await axios({
            method: 'get',
            url: 'http://training.virash.in/todos/hardik'
        });
        setResult(response.data);
        // console.log(response);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const addTodo = async (newTodo) => {
        const response = await axios({
            method: 'post',
            url: 'http://training.virash.in/todos/hardik',
            data: newTodo
        });
        console.log(response.data.message);
        fetchData();
    }

    const clearTodo = async () => {
        const response = await axios({
            method: 'get',
            url: 'http://training.virash.in/clear/hardik',
        });
        console.log(response.data.message);
        fetchData();
    }

    const deleteTodo = async (id) => {
        const response = await axios({
            method: 'delete',
            url: 'http://training.virash.in/todos/hardik',
            data: { id }
        });
        console.log(response.data.message);
        fetchData();
    }

    const checkedTodo = async (updateChecked) => {
        const response = await axios({
            method: 'put',
            url: 'http://training.virash.in/todos/hardik',
            data: updateChecked
        });
        console.log(response.data.message);
        fetchData();
    }

    const updateTodo = async (updateTitle) => {
        const response = await axios({
            method: 'post',
            url: 'http://training.virash.in/updateTodo/hardik',
            data: updateTitle
        });
        console.log(response.data.message);
        fetchData();
    }
    // console.log(result)

    return [result, addTodo, clearTodo, deleteTodo, checkedTodo, updateTodo];
}

export default useToDoApi;