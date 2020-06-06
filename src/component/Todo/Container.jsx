import React, { useEffect } from 'react';
import useTodo from '../../hooks/useTodo';
import Input from './Input';
import List from './List';

const Container = () => {
  const {
    todos,
    getTodos,
  } = useTodo();

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="content">
        <Input />
        {todos.length ? <List todos={todos}/> : null}
      </div>
    </div>
  )
}

export default Container;