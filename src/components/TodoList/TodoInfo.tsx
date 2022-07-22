/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoForm } from '../TodoForm/TodoForm';
import { UserInfo } from '../UserInfo/UserInfo';

import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = React.memo(
  ({ todo }) => {
    const [isEditing, setEditing] = useState(false);
    const { deleteTodo, updateTodo } = useContext(TodosContext);

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
              updateTodo(updatedTodo);
              setEditing(false);
            }}
          />
        ) : (
          <>
            <h2 className="TodoInfo__title">
              {todo.title}

              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
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
