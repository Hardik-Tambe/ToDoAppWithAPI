import React, { useState } from 'react';
import useToDoApi from '../CustomHooks/ToDoApiHook.js';
import './todo.css'; // Import the CSS file

function App() {
    const [taskName, setTaskName] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [result, addTodo, clearTodo, deleteTodo, checkedTodo, updateTodo] = useToDoApi();
    // console.log(result)
    const handleAddTodo = () => {
        if (taskName) {
            addTodo({  title: taskName, checked: false });
            setTaskName('');
        }
    }

    const handleChecked = (id, isChecked) => {
        checkedTodo({ id: id, checked: isChecked })
    };

    const handleUpdate = (id, newTitle) => {
        if (editTitle) {
            updateTodo({ id: id, title: newTitle });
        }
    };

    const handleDelete = (id) => {
        deleteTodo(id)
    };

    const handleClearTodo = () => {
        if (result) {
            clearTodo();
        }
    };

    return (
        <div className='container'>
            <form>
                <h1 className='text-center bg-dark text-white mb-5'>Todo List</h1>
                <input
                    type='text'
                    placeholder='Enter New Task...'
                    value={taskName}
                    className="taskInput"
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <div className='text-center'>
                    <button className='btn btn-primary my-3' onClick={handleAddTodo}>Add Todo</button>
                    <button className='btn btn-danger mx-2 ' onClick={handleClearTodo}>Clear All</button>
                </div>
                <ul className='taskList'>
                    {result && result.map(todo => (
                        <li key={todo._id} className='taskItem'>
                            <div className='checkbox'>
                                <input
                                    type='checkbox'
                                    checked={todo.checked}
                                    onChange={() => handleChecked(todo._id, !todo.checked)}
                                />
                            </div>
                            <input
                                type='text'
                                className='title'
                                defaultValue={todo.title}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <div className='actions'>
                                <button className='btn btn-primary' onClick={() => handleUpdate(todo._id, editTitle)}>Update</button>
                                <button className='btn btn-danger' onClick={() => handleDelete(todo._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );
}

export default App;
