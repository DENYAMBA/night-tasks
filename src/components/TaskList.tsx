import React from 'react';
import { useTasks } from '../hooks/useTasks';
import { useInitData } from './service/GlobalStateProvider/context';

export const TaskList: React.FC = () => {
  const { tasks, completeTask } = useTasks();
  const { user } = useInitData();
const userName = user?.first_name || 'Пользователь';

  const activeTasks = tasks.filter(t => t.status !== 'выполнено');
  const completedTasks = tasks.filter(t => t.status === 'выполнено');

  return (
    <div>
      <h2>⏳ Активные задачи</h2>
      {activeTasks.length === 0 && <p>Нет активных задач</p>}
      {activeTasks.map(task => (
        <div key={task.id} style={{ border: '1px solid #ccc', margin: '8px 0', padding: '8px' }}>
          <strong>{task.task}</strong><br />
          <small>Создал: {task.createdBy}</small><br />
          {task.dueDate && <small>Срок: {task.dueDate}</small>}<br />
          <button onClick={() => completeTask(task.id, userName)}>✓ Выполнено</button>
        </div>
      ))}

      <h2>✅ Выполненные задачи</h2>
      {completedTasks.length === 0 && <p>Нет выполненных задач</p>}
      {completedTasks.map(task => (
        <div key={task.id} style={{ border: '1px solid #ccc', margin: '8px 0', padding: '8px', opacity: 0.7 }}>
          <strong>{task.task}</strong><br />
          <small>Выполнил: {task.completedBy}</small>
        </div>
      ))}
    </div>
  );
};