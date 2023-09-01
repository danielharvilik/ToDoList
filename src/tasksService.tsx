import axios from 'axios';

const BASE_URL = 'https://64f1addf0e1e60602d241e78.mockapi.io/';

import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string({}).min(1).max(20),
  deadline: z.string(),
  description: z.string(),
  isCompleted: z.boolean().default(false),
});

export type Todo = CreateTodoBody & { id: string };

export type CreateTodoBody = z.infer<typeof todoSchema>;

export type UpdateTodoBody = Partial<CreateTodoBody>;

export const postTodo = (createTodoBody: CreateTodoBody) => axios.post(`${BASE_URL}/todos`, createTodoBody);

export const putTodo = (updateTodoBody: UpdateTodoBody) => axios.put(`${BASE_URL}/todos`, updateTodoBody);

export const getAllTodos = () => axios.get<Todo[]>(`${BASE_URL}/todos`).then((res) => res.data);
