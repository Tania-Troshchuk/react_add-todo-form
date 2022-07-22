/* eslint-disable no-console */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[],
  onTodoDeleted: (todoId: number) => void,
  onTodoUpdated: (updatedTodo: Todo) => void,
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    onTodoDeleted,
    onTodoUpdated,
  }) => {
    // console.log('Rendering TodoList');

    return (
      <section className="TodoList">
        {todos.map(todo => (
          <TodoInfo
            todo={todo}
            key={todo.id}
            onDelete={onTodoDeleted}
            onUpdate={onTodoUpdated}
          />
        ))}
      </section>
    );
  },
);
