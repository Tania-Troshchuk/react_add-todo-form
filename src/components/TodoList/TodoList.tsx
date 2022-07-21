import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[],
  onTodoDeleted: (todoId: number) => void,
  onTodoUpdated: (updatedTodo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onTodoDeleted,
  onTodoUpdated,
}) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        todo={todo}
        key={todo.id}
        onDelete={() => onTodoDeleted(todo.id)}
        onUpdate={onTodoUpdated}
      />
    ))}
  </section>
);
