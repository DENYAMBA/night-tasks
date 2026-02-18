import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useInitData } from './service/GlobalStateProvider/context';

export const AddTaskForm: React.FC = () => {
  const [task, setTask] = useState('');
  const [due, setDue] = useState('');
  const { addTask } = useTasks();
  const { user } = useInitData();
  const userName = user?.first_name || 'Пользователь';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTask(task, due, userName);
    setTask('');
    setDue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Опишите задачу"
        value={task}
        onChange={e => setTask(e.target.value)}
        rows={3}
        style={{ width: '100%', marginBottom: '8px' }}
      />
      <input
        type="date"
        value={due}
        onChange={e => setDue(e.target.value)}
        style={{ marginBottom: '8px', width: '100%' }}
      />
      <button type="submit">➕ Добавить задачу</button>
    </form>
  );
};