/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoForm } from '../TodoForm/TodoForm';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo,
  onDelete: (todoId: number) => void,
  onUpdate: (updatedTodo: Todo) => void,
};

export const TodoInfo: React.FC<Props> = React.memo(
  ({ todo, onDelete, onUpdate }) => {
    const [isEditing, setEditing] = useState(false);

    return (
      <article
        data-id={todo.id}
        className={classNames('TodoInfo', {
          'TodoInfo--completed': todo.completed,
        })}
      >
        {isEditing ? (
          <TodoForm
            todo={todo}
            onSubmit={(updatedTodo) => {
              onUpdate(updatedTodo);
              setEditing(false);
            }}
          />
        ) : (
          <>
            <h2 className="TodoInfo__title">
              {todo.title}

              <button
                type="button"
                onClick={() => onDelete(todo.id)}
              >
                x
              </button>

              <button
                type="button"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            </h2>

            {todo.user && (
              <UserInfo user={todo.user} />
            )}
          </>
        )}
      </article>
    );
  },
);
