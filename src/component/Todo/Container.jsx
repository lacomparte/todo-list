import React, { useEffect } from 'react';
import useTodo from '../../hooks/useTodo';
import Input from './Input';
import List from './List';
import { Bell1, Bell2 } from '../Svg';

const Container = () => {
  const {
    todos,
    getTodos,
  } = useTodo();

  useEffect(() => {
    getTodos();
  }, [getTodos]);
  
  const checkAlarm = () => 
    todos.length ? todos
    .filter(todo => 
      new Date(todo.date).getTime() < new Date().getTime()
    ) : [];
  
  const handleClick = () => {
    const expiredList = checkAlarm();
    if (!expiredList.length) return;
    const titles = expiredList.map(todo => todo.title);
    alert(`타이틀 [${titles.join(',')}] 할 일은 마감기한이 지났습니다.`);
  }

  return (
    <div className="container">
      <div className="bell" onClick={handleClick}>
        {todos.length ? checkAlarm().length ? <Bell2/> : <Bell1/> : null}
      </div>
      <h1>Todo List</h1>
      <div className="content">
        <Input />
        {todos.length ? <List todos={todos}/> : null}
      </div>
    </div>
  )
}

export default Container;