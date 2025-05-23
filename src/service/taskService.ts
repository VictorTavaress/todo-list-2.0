import axios from 'axios';

const API_URL = 'http://localhost:8085';

export interface Task {
    id?: string;
    description: string;
    responsable: string;
    status: string;
    computer?: string;
    color?: string;
}

export async function getTasks(): Promise<Task[]> {
    const response = await axios.get<Task[]>(`${API_URL}/get-tasks`);
    return response.data;
}

export async function insertTasks(tasks: Omit<Task, 'id' | 'computer'>[]): Promise<void> {
    await axios.post(`${API_URL}/insert-tasks`, tasks);
}

export async function updateTask(id: string, task: Omit<Task, 'id' | 'computer'>): Promise<void> {
    await axios.put(`${API_URL}/update-task/${id}`, task);
}

export async function deleteTask(id: string): Promise<void> {
    await axios.delete(`${API_URL}/delete-task/${id}`);
}