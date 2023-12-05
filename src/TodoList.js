import React, { useState } from 'react';
import './todo.css';
import Header from './Header';
const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
    { id: 3, text: 'Task 3' },
  ]);

  const [newTaskText, setNewTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: newTaskText.trim(),
      };

      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId, taskText) => {
    setEditingTaskId(taskId);
    setEditedTaskText(taskText);
  };

  const handleSaveEdit = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, text: editedTaskText.trim() } : task
    );

    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskText('');
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTaskText('');
  };

  return (
    
    <div className='container-fluid'>
        <Header/>
          <h2>To-Do List</h2><br/>
      <div>
        <input
          type="text"
          placeholder="New task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <br />
      <table>
        {/* ... (table structure) */}
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <tr>
              <td>{task.id}</td>
              <td>
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                  />
                ) : (
                  task.text
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <>
                    <button className="save-btn" onClick={handleSaveEdit}>
                      Save
                    </button>
                    <button className="cancel-btn" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditTask(task.id, task.text)}
                    >
                      E
                    </button> &nbsp; &nbsp;
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      D
                    </button>
                  </>
                )}
              </td>
            </tr>
            {/* ... (accordion content) */}
          </React.Fragment>
        ))}
      </table>
    </div>
  );
};

export default TodoList;
