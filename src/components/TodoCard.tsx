import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Todo, deleteTodo, putTodo } from '../tasksService';

export const TodoCard = (props: {todo : Todo}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <>
      <section
        key={props.todo.id}
        style={{ width: '400px', textAlign: 'center', margin: '0 auto' }}
      >
        <ul
          onClick={() => navigate(`/${props.todo.id}`)}
          className="cursor-pointer"
        >
          <li>{props.todo.title}</li>
          <li>{props.todo.deadline}</li>
          <li>{props.todo.description}</li>
        </ul>
        <input
          type="checkbox"
          defaultChecked={props.todo.isCompleted}
          className="checkbox"
          onChange={async () => {
            await putTodo(props.todo.id, { isCompleted: !props.todo.isCompleted });
            queryClient.invalidateQueries({ queryKey: ['todos'] });
          }}
        />
        <button
          className="btn btn-active btn-neutral"
          onClick={async () => {
            await deleteTodo(props.todo.id);
            queryClient.invalidateQueries({ queryKey: ['todos'] });
          }}
        >
          delete
        </button>
        <br />
        <br />
        <hr />
      </section>
    </>
  );
};
