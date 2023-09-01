import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import TaskList from './components/TodoList';

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <h1>Todo App</h1>
        <TaskList />
      </QueryClientProvider>
    </>
  );
}

export default App;
