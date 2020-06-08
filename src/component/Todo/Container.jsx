import React, { useEffect, useState } from 'react';
import useTodo from '../../hooks/useTodo';
import Input from './Input';
import List from './List';
import { Bell1, Bell2 } from '../Svg';

const Container = () => {
  const [isCheck, setIsCheck ] = useState(false);
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (checkAlarm().length && !isCheck) {
        alert('마감기한이 지난 할 일이 있습니다. 확인해주세요.');
        clearInterval(interval);
      }
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    }
  });
  
  const handleClick = () => {
    const expiredList = checkAlarm();
    if (!expiredList.length) return;
    const titles = expiredList.map(todo => todo.title);
    alert(`타이틀 [${titles.join(',')}] 할 일은 마감기한이 지났습니다.`);
    setIsCheck(true);
  }

  return (
    <div className="container">
      <div className="bell" onClick={handleClick}>
        { checkAlarm().length ? !isCheck ? <Bell2/> : <Bell1/> : <Bell1/>}
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