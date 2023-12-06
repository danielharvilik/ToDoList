import { useParams } from 'react-router-dom';
import { TodoForm } from '../components/TodoForm';
import { useQuery } from '@tanstack/react-query';
import { getTodoById } from '../tasksService';

export const EditTodoPage = () => {
  const { id } = useParams();
  const {
    data: todo,
    isLoading,
    isFetching,
  } = useQuery({ queryKey: [`todo_${id}`], queryFn: () => getTodoById(id || '') });

  if (isLoading || isFetching) {
    return <>Loading...</>;
  }

  return (
    <>
      <h1>Edit Todo {id}</h1>
      <TodoForm initialTodo={todo} />
    </>
  );
};
