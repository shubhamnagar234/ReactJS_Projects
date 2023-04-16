import React, { useState } from 'react';
import './css/todolist.css';

function TodoList() {
    const [ tasks, setTasks ] = useState([
        { task: 'Task1', description: 'Description1' },
        { task: 'Task2', description: 'Description2' },
        { task: 'Task3', description: 'Description3' },
    ]);
    const [ addTask, setAddTask ] = useState('');
    const [ addDescription, setAddDescription ] = useState('');
    const [ editIndex, setEditIndex ] = useState(false);
    const [ editTask, setEditTask ] = useState({ task: '', description: '' });

    const handleAddTask = (event) => {
        setAddTask(event.target.value);
    };
    
    const handleAddDescription = (event) => {
        setAddDescription(event.target.value);
    };

    const handleAdd = (event) => {
        if (!addTask && !addDescription){
            alert("plz enter task and description");
        } else {
        event.preventDefault();
        const newTask = {
        task: addTask,
        description: addDescription,
        completed: false,
        };
        setTasks([...tasks, newTask]);
        setAddTask('');
        setAddDescription('');
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditTask({ task: tasks[index].task, description: tasks[index].description });
    };
    
    const handleSave = () => {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = { ...updatedTasks[editIndex], ...editTask };
        setTasks(updatedTasks);
        setEditIndex(false);
        setEditTask({ task: '', description: '' });
    };
    
    const handleCancel = () => {
        setEditIndex(-1);
        setEditTask({ task: '', description: '' });
    };
    
    const handleEditTask = (event) => {
        setEditTask({ ...editTask, task: event.target.value });
    };
    
    const handleEditDescription = (event) => {
        setEditTask({ ...editTask, description: event.target.value });
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task, index) => index !== id));
    };

    return (
        <div className='main-div'>
            <div className='title-div'>
                <h1 className='title-todo-list'>To-Do List</h1>
                <img className='icon-todo-list' src={require('./assets/icons/icons8-todo-list-64.png')} alt='icon-todo-list' />
            </div>
            <div className='input-task'>
                <div className='input-field'>
                    <input className='addtask' type="text" placeholder="Enter task" value={addTask} onChange={handleAddTask} />
                    <input className='adddescription' type="text" placeholder="Enter description" value={addDescription} onChange={handleAddDescription} />
                </div>
                <div className='btn-add'>
                    <img className='icon-add' src={require('./assets/icons/icons8-add-new-50.png')} alt='icon-add' onClick={handleAdd} />
                </div>
            </div>
            <div className='task-list'>
                {
                    tasks.map((task, index) => (
                    <div className='task-item' key={index}>
                        {
                        editIndex === index ? (
                        <div className='edited'>
                            <div className='edited-task-description'>
                                <input className='edit-task' type='text' value={editTask.task} onChange={handleEditTask} />
                                <input className='edit-description' type='text' value={editTask.description} onChange={handleEditDescription} />
                            </div>
                            <div className='icon-save-cancel'>
                                <img className='icon-save' src={require('./assets/icons/icons8-edited-50.png')} alt='icon-save' onClick={handleSave} />
                                <img className='icon-cancel' src={require('./assets/icons/icons8-close-window-50.png')} alt='icon-cancel' onClick={handleCancel} />
                            </div>
                        </div>
                        ) : (
                        <div className='task-summary'>
                            <div className='task-card'>
                                <div className='task-details'>
                                    <h2 className='task-name'>{task.task}</h2>
                                    <p className='task-desc'>{task.description}</p>
                                </div>
                                <div className='task-actions'>
                                    <img className='icon-edit' src={require('./assets/icons/icons8-edit-64.png')} alt='icon-edit' onClick={() => handleEdit(index)} />
                                    <img className='icon-delete' src={require('./assets/icons/icons8-remove-60.png')} alt='icon-delete' onClick={() => handleDeleteTask(index)} />
                                </div>
                            </div>  
                        </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;