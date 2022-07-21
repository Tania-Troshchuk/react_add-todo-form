import { useEffect, useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm/TodoForm';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(
    user => user.id === userId,
  );

  return foundUser || null;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const initialTodos = todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    }));

    setTodos(initialTodos);
  }, []);

  const addTodo = (
    newTitle: string,
    newUserId: number,
    newCompleted: boolean,
  ) => {
    const maxId = Math.max(
      ...todos.map(todo => todo.id),
    );

    const newTodo: Todo = {
      id: maxId + 1,
      title: newTitle,
      userId: newUserId,
      completed: newCompleted,
      user: getUser(newUserId),
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
      todos.map(todo => {
        if (todo.id !== updatedTodo.id) {
          return todo;
        }

        return {
          ...updatedTodo,
          user: getUser(updatedTodo.userId),
        };
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
