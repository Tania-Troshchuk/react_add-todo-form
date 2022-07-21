import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';

type Props = {
  onSubmit: (
    title: string,
    userId: number,
    completed: boolean,
  ) => void,

  todo?: Todo | null,
};

export const TodoForm: React.FC<Props> = ({ onSubmit, todo }) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [userId, setUserId] = useState(todo?.userId || 0);
  const [completed, setCompleted] = useState(todo?.completed || false);

  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserIdError, setUserIdError] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit(title, userId, completed);

    setTitle('');
    setUserId(0);
    setCompleted(false);
  }

  return (
    <form action="/api/users" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          placeholder="Enter a title"
          data-cy="titleInput"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            setTitleError(false);
          }}
        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={event => {
            setUserId(+event.target.value);
            setUserIdError(false);
          }}
        >
          <option value="0" disabled>Choose a user</option>

          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <div className="field">
        <label>
          is completed
          <input
            type="checkbox"
            checked={completed}
            onChange={event => {
              setCompleted(event.target.checked);
            }}
          />
        </label>
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

TodoForm.defaultProps = {
  todo: null,
};
