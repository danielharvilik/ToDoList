import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Todo, getAllTodos } from '../tasksService';
import { TodoCard } from './TodoCard';

function TodoList() {
  const { data: todos, isLoading } = useQuery({ queryKey: ['todos'], queryFn: getAllTodos });

  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  if (isLoading) {
    return <>Loading...</>;
  }

  const filteredTodos: Todo[] =
    todos?.filter((todo) => {
      if (filter === 'all') {
        return true;
      } else if (filter === 'completed') {
        return todo.isCompleted;
      } else return !todo.isCompleted;
    }) || [];

  console.log(filteredTodos);
  console.log(filter);

  return (
    <>
      <h1>ToDo List</h1>
      <br />
      <br />
      <div className="dropdown">
        <label
          tabIndex={0}
          className="btn m-1"
        >
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a
              onClick={() => {
                setFilter('active');
              }}
            >
              Active
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setFilter('completed');
              }}
            >
              Completed
            </a>
          </li>
        </ul>
      </div>
      <button
        className="btn-active btn-neutral ml-32"
        onClick={() => {
          setFilter('all');
        }}
      >
        reset Filter
      </button>
      <br />
      <br />
      {filteredTodos?.map((todo: Todo) => (
        <TodoCard todo={todo} />
      ))}
      <button
        className="btn btn-active btn-neutral"
        onClick={() => navigate('/create')}
      >
        Create todo
      </button>
    </>
  );
}

export default TodoList;
