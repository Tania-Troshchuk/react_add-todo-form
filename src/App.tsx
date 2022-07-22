import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';

import todosFromServer from './api/todos';
import { getUser, TodoForm } from './components/TodoForm/TodoForm';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (todoData: Todo) => {
    const maxId = Math.max(
      ...todos.map(todo => todo.id),
    );

    const newTodo: Todo = {
      ...todoData,
      id: maxId + 1,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const deleteTodo = (todoId: number) => {
    const filteredTodos = todos.filter(
      todo => todo.id !== todoId,
    );

    setTodos(filteredTodos);
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(
      currentTodos => currentTodos.map(todo => {
        return todo.id !== updatedTodo.id
          ? todo
          : updatedTodo;
      }),
    );
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />

      <TodoList
        todos={todos}
        onTodoDeleted={deleteTodo}
        onTodoUpdated={updateTodo}
      />
    </div>
  );
};
