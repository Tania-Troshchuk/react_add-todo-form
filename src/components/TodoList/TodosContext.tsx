import React, { useCallback, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getUser } from '../TodoForm/TodoForm';

import todosFromServer from '../../api/todos';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

type ContextType = {
  todos: Todo[],
  addTodo(todo: Todo): void,
  deleteTodo(todoId: number): void,
  updateTodo(todo: Todo): void,
};

export const TodosContext = React.createContext<ContextType>({
  todos: [],
  addTodo() {},
  deleteTodo() {},
  updateTodo() {},
});

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = useCallback(
    (todoData: Todo) => {
      setTodos(currentTodos => {
        const maxId = Math.max(
          ...currentTodos.map(todo => todo.id),
        );

        const newTodo: Todo = {
          ...todoData,
          id: maxId + 1,
        };

        return [...currentTodos, newTodo];
      });
    },
    [],
  );

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

  const contextValue = useMemo(() => {
    return {
      todos,
      addTodo,
      deleteTodo,
      updateTodo,
    };
  }, [todos]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
