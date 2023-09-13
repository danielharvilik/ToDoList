import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';
import { CreateTodoPage } from './pages/CreateTodoPage';
import { EditTodoPage } from './pages/EditTodoPage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoList />,
  },
  {
    path: '/create',
    element: <CreateTodoPage />,
  },
  {
    path: '/:id',
    element: <EditTodoPage />,
  },
]);
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
