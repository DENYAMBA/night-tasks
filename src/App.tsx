import React from 'react';
import { AddTaskForm } from './components/AddTaskForm';
import { TaskList } from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="App" style={{ padding: '16px' }}>
      <h1>📋 Ночные задачи</h1>
      <AddTaskForm />
      <TaskList />
    </div>
  );
}

export default App;