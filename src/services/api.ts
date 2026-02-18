const API_URL = 'https://script.google.com/macros/s/AKfycbyRuVjgvvBnTOT87mE4vefI8sgVkz73CAAXe5bNsAljjVJQTeR5-YU2FNKBLg6ohS1n/exec'; // ⚠️ ЗАМЕНИ ПОТОМ

type Task = {
  id: number | string;
  task: string;
  createdBy: string;
  createdDate: string;
  dueDate: string;
  status: 'не выполнено' | 'выполнено';
  completedBy?: string;
};

type ApiResponse<T> = T;

// Универсальная JSONP-функция
function jsonp<T>(url: string, callbackName: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const callback = callbackName + Date.now();
    (window as any)[callback] = (data: T) => {
      resolve(data);
      delete (window as any)[callback];
      document.body.removeChild(script);
    };
    const separator = url.includes('?') ? '&' : '?';
    script.src = url + separator + 'callback=' + callback;
    script.onerror = () => reject(new Error('JSONP request failed'));
    document.body.appendChild(script);
  });
}

export const loadTasks = () => jsonp<Task[]>(API_URL, 'loadTasks');

export const addTask = (taskText: string, createdBy: string, dueDate?: string) => {
  const url = `${API_URL}?action=add&task=${encodeURIComponent(taskText)}&createdBy=${encodeURIComponent(createdBy)}${dueDate ? '&dueDate=' + encodeURIComponent(dueDate) : ''}`;
  return jsonp<{ success: boolean; id?: number; error?: string }>(url, 'addTask');
};

export const markTaskDone = (taskId: number | string, completedBy: string) => {
  const url = `${API_URL}?action=done&id=${encodeURIComponent(taskId)}&completedBy=${encodeURIComponent(completedBy)}`;
  return jsonp<{ success: boolean; error?: string }>(url, 'doneTask');
};