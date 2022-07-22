/* eslint-disable no-console */
import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

// type Callback = (s: string) => void;
// function debounce(f: Callback, delay: number) {
//   let timerId = 0;

//   return (str: string) => {
//     window.clearTimeout(timerId);

//     timerId = window.setTimeout(() => {
//       f(str);
//     }, delay);
//   };
// }

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button type="button" onClick={() => setCount(count + 1)}>
        {count}
      </button>

      <h1>Add todo form</h1>
      <TodoList />
    </div>
  );
};
