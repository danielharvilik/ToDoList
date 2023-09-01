import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateTodoBody, postTodo, todoSchema } from '../tasksService';

export const TodoForm = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTodoBody>({ resolver: zodResolver(todoSchema) });

  const postTodoMutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      reset();
    },
  });

  console.log(errors);

  const onSubmit: SubmitHandler<CreateTodoBody> = (createTodo) => {
    console.log(createTodo);
    postTodoMutation.mutate(createTodo);
  };

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
        type="date"
        {...register('deadline')}
        placeholder="Deadline"
        className="input input-bordered input-neutral"
      />
      <label>Description</label>
      <textarea
        {...register('description')}
        placeholder="Enter description"
        className="textarea textarea-bordered"
      />
      <button
        type="submit"
        className="btn btn-active btn-neutral"
        disabled={postTodoMutation.isLoading}
      >
        Add
      </button>
    </form>
  );
};
