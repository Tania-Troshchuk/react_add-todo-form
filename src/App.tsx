/* eslint-disable no-console */
import { useCallback, useMemo, useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';

import todosFromServer from './api/todos';
import { getUser, TodoForm } from './components/TodoForm/TodoForm';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

type Callback = (s: string) => void;

function debounce(f: Callback, delay: number) {
  let timerId = 0;

  return (str: string) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      f(str);
    }, delay);
  };
}

export const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(initialTodos);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

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

  const deleteTodo = useCallback(
    (todoId: number) => {
      setTodos(
        currentTodos => currentTodos.filter(
          todo => todo.id !== todoId,
        ),
      );
    },
    [],
  );

  const updateTodo = useCallback(
    (updatedTodo: Todo) => {
      setTodos(
        currentTodos => currentTodos.map(todo => {
          return todo.id !== updatedTodo.id
            ? todo
            : updatedTodo;
        }),
      );
    },
    [],
  );

  const visibleTodos = useMemo(() => {
    const lowerQuery = appliedQuery.toLowerCase();

    return todos.filter(
      todo => todo.title.toLowerCase().includes(lowerQuery),
    );
  }, [todos, appliedQuery]);

  return (
    <div className="App">
      <input
        type="text"
        value={query}
        onChange={event => {
          setQuery(event.target.value);
          applyQuery(event.target.value);
        }}
      />

      <button type="button" onClick={() => setCount(count + 1)}>
        {count}
      </button>

      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />

      <TodoList
        todos={visibleTodos}
        onTodoDeleted={deleteTodo}
        onTodoUpdated={updateTodo}
      />
    </div>
  );
};
