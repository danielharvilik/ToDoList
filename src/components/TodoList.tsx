import React, { useState } from 'react';
import { TodoForm } from './TodoForm';
import { useQuery } from '@tanstack/react-query';
import { getAllTodos } from '../tasksService';

function TodoList() {
  const { data: todos, isLoading } = useQuery({ queryKey: ['todos'], queryFn: getAllTodos });

  console.log(todos);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <h2>Tasks List</h2>
      <br />
      <hr />
      {todos?.map((todo) => JSON.stringify(todo))}
      <TodoForm />
    </>
  );
}

export default TodoList;
