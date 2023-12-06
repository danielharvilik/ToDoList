import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Todo, getAllTodos } from '../tasksService';
import { TodoCard } from './TodoCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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

  return (
    <>
      <h1>ToDo List</h1>
      <br />
      <br />
      <section className="flex w-full justify-between">
        <details className="dropdown w-52">
          <summary
            tabIndex={0}
            className="btn btn-primary m-1"
          >
            Filter
          </summary>
          <ul
            tabIndex={0}
            className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
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
        </details>
        <div className="w-52">
          <button
            className="btn btn-primary"
            onClick={() => {
              setFilter('all');
            }}
          >
            reset Filter
          </button>
        </div>
      </section>
      <br />
      <br />
      <section>
        {filteredTodos?.map((todo: Todo) => (
          <TodoCard todo={todo} />
        ))}
      </section>

      <button
        className="btn btn-primary rounded-full bottom-12 right-12 fixed inline-flex items-center justify-center w-12 h-12"
        onClick={() => navigate('/create')}
      >
      <FontAwesomeIcon icon={faPlus} size="xl"/>
      </button>
    </>
  );
}

export default TodoList;
