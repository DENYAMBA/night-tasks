export type Task = {
  id: number | string;
  task: string;
  createdBy: string;
  createdDate: string;
  dueDate?: string;
  status: 'не выполнено' | 'выполнено';
  completedBy?: string;
};