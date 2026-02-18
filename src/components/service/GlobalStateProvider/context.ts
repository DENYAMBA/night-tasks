import React, { createContext, useContext, useMemo, useState } from 'react';
import { TasksState } from '../../../types/task';

export type ReactState<T> = {
  value: T;
  setter: React.Dispatch<React.SetStateAction<T>>;
};

export type GlobalState = {
  tasks?: ReactState<TasksState>;
};

export const AppContext = createContext<GlobalState>({});

export const useInitGlobalState = () => {
  const [tasks, setTasks] = useState<TasksState>([]);

  return useMemo(() => {
    return {
      tasks: {
        value: tasks,
        setter: setTasks,
      },
    } as Required<GlobalState>;
  }, [tasks]);
};

export const useInitData = () => {
  const tg = window.Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user;
  return { user, tg };
};

export default AppContext;