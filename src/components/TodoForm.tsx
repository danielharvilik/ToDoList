import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CreateTodoBody, Todo, UpdateTodoBody, postTodo, putTodo, todoSchema } from '../tasksService';

type TodoFormProps = {
  initialTodo?: Todo;
};

export const TodoForm = ({ initialTodo }: TodoFormProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTodoBody>({ resolver: zodResolver(todoSchema), defaultValues: initialTodo });

  const postTodoMutation = useMutation({
    mutationFn: initialTodo ? (todo: UpdateTodoBody) => putTodo(initialTodo.id, todo) : postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', `todo_${initialTodo?.id}`] });
      reset();
      navigate('/');
    },
  });

  console.log(errors);

  const onSubmit: SubmitHandler<CreateTodoBody> = (createTodo) => {
    console.log(createTodo);
    postTodoMutation.mutate(createTodo);
  };

  const isUpdating = Boolean(initialTodo);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Title</label>
      <input
        {...register('title')}
        placeholder="Enter title"
        className="input input-bordered input-neutral"
      />
      {/* <ErrorMessage
        errors={errors}
        name="title"
        as="p"
      /> */}

      <label>Deadline</label>
      <input
        {...register('deadline')}
        type="date"
        placeholder="Deadline"
        className="input input-bordered input-neutral"
        min={new Date().toJSON().slice(0, 10)}
      />
      <label>Description</label>
      <textarea
        {...register('description')}
        placeholder="Enter description"
        className="textarea textarea-bordered"
      />
      {initialTodo ? (
        <>
          <input
            type="checkbox"
            checked={initialTodo.isCompleted}
            className="checkbox"
            onChange={() => {}}
            disabled
          />
        </>
      ) : (
        <></>
      )}
      <button
        type="submit"
        className="btn btn-active btn-neutral"
        disabled={postTodoMutation.isLoading}
      >
        {isUpdating ? 'Edit' : 'Add'}
      </button>
      <button
        className="btn btn-active btn-neutral"
        onClick={() => navigate('/')}
      >
        Home page
      </button>
    </form>
  );
};
