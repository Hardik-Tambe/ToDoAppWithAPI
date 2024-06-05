import { useEffect, useState } from 'react';
import axios from 'axios';

function useToDoApi() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('https://todo-backend-3g3y.onrender.com/getTodo');
      if (response.data && response.data.allTodos) {
        setResult(response.data.allTodos);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post('https://todo-backend-3g3y.onrender.com/addTodo', newTodo);
      console.log(response.data.message); // Check if the response contains the expected message
      fetchData(); // Refresh the list of todos
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const clearTodo = async () => {
    try {
      const response = await axios.delete('https://todo-backend-3g3y.onrender.com/deleteAllTodo');
      console.log(response.data.message);
      fetchData();
    } catch (error) {
      console.error("Error clearing todos:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete('https://todo-backend-3g3y.onrender.com/deleteTodo', { data: { id } });
      console.log(response.data.message);
      fetchData();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const checkedTodo = async (updateChecked) => {
    try {
      const response = await axios.patch('https://todo-backend-3g3y.onrender.com/updateTodoChecked', updateChecked);
      console.log(response.data.message);
      fetchData();
    } catch (error) {
      console.error("Error updating todo checked status:", error);
    }
  };

  const updateTodo = async (updateTitle) => {
    try {
      const response = await axios.patch('https://todo-backend-3g3y.onrender.com/updateTodo', updateTitle);
      console.log(response.data.message);
      fetchData();
    } catch (error) {
      console.error("Error updating todo title:", error);
    }
  };

  return [result, addTodo, clearTodo, deleteTodo, checkedTodo, updateTodo];
}

export default useToDoApi;
