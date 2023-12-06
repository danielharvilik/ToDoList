import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Todo, deleteTodo, putTodo } from '../tasksService';

export const TodoCard = (props: { todo: Todo }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <>
      <section
        className="items-center"
        key={props.todo.id}
      >
        <div className="card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <div className="card-title flex justify-between">
              <h2 className="">{props.todo.title}</h2>
              <input
                type="checkbox"
                defaultChecked={props.todo.isCompleted}
                className="checkbox checkbox-primary"
                onChange={async () => {
                  await putTodo(props.todo.id, { isCompleted: !props.todo.isCompleted });
                  queryClient.invalidateQueries({ queryKey: ['todos'] });
                }}
              />
            </div>
            <p>{props.todo.deadline}</p>
            <p>{props.todo.description}</p>
            <div className="card-actions justify-end mt-8">
              <button
                className="btn btn-ghost"
                onClick={() => navigate(`/${props.todo.id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-error"
                onClick={async () => {
                  await deleteTodo(props.todo.id);
                  queryClient.invalidateQueries({ queryKey: ['todos'] });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="divider divider-primary"></div>
      </section>
    </>
  );
};
