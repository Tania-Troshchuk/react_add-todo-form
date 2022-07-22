/* eslint-disable no-console */
import { debounce } from 'lodash';

import {
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { TodoForm } from '../TodoForm/TodoForm';
import { TodoInfo } from './TodoInfo';
import { TodosContext, TodosProvider } from './TodosContext';

const List = () => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const { todos, addTodo } = useContext(TodosContext);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const visibleTodos = useMemo(() => {
    const lowerQuery = appliedQuery.toLowerCase();

    return todos.filter(
      todo => todo.title.toLowerCase().includes(lowerQuery),
    );
  }, [todos, appliedQuery]);

  console.log('Rendering LIst');

  return (
    <section className="TodoList">
      <input
        type="text"
        value={query}
        onChange={event => {
          setQuery(event.target.value);
          applyQuery(event.target.value);
        }}
      />

      <TodoForm onSubmit={addTodo} />

      {visibleTodos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};

export const TodoList = () => (
  <TodosProvider>
    <List />
  </TodosProvider>
);
