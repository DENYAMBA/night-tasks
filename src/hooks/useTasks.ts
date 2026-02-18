import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../components/service/GlobalStateProvider/context';
import { loadTasks, addTask as apiAddTask, markTaskDone as apiMarkTaskDone } from '../services/api';

export const useTasks = () => {
  const context = useContext(AppContext);
  const { value: tasks, setter: setTasks } = context.tasks!;

  // Загрузка задач при первом рендере
  useEffect(() => {
    loadTasks().then(setTasks).catch(console.error);
  }, []);

  const addTask = (taskText: string, dueDate: string | undefined, userName: string) => {
    const tempId = 'temp_' + Date.now();
    const newTask = {
      id: tempId,
      task: taskText,
      createdBy: userName,
      createdDate: new Date().toLocaleDateString('ru-RU'),
      dueDate: dueDate || '',
      status: 'не выполнено' as const,
    };

    // Оптимистичное добавление
    setTasks(prev => [...prev, newTask]);

    apiAddTask(taskText, userName, dueDate)
      .then(result => {
        if (!result.success) {
          setTasks(prev => prev.filter(t => t.id !== tempId));
          alert('Ошибка при добавлении: ' + (result.error || 'неизвестная ошибка'));
        } else {
          // Обновляем временный ID на реальный (если нужно)
          setTasks(prev => prev.map(t => t.id === tempId ? { ...t, id: result.id! } : t));
        }
      })
      .catch(err => {
        setTasks(prev => prev.filter(t => t.id !== tempId));
        alert('Ошибка сети при добавлении');
      });
  };

  const completeTask = (taskId: number | string, completedBy: string) => {
    // Сохраняем исходное состояние для возможного отката
    const originalTask = tasks.find(t => t.id === taskId);
    if (!originalTask) return;

    // Оптимистичное обновление
    setTasks(prev => prev.map(t =>
      t.id === taskId ? { ...t, status: 'выполнено', completedBy } : t
    ));

    apiMarkTaskDone(taskId, completedBy)
      .catch(() => {
        // Восстанавливаем исходное состояние при ошибке
        setTasks(prev => prev.map(t => t.id === taskId ? originalTask : t));
        alert('Не удалось отметить задачу выполненной');
      });
  };

  return { tasks, addTask, completeTask };
};