import React, { useState, useMemo, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import useTodo from '../../hooks/useTodo';
import Item from './Item';

const List = ({ todos, }) => {
  const { dragTodo } = useTodo();
  const [ list, setList ] = useState([]);

  useEffect(() => {
    setList(todos);
  }, [setList, todos]);

  const handleDragEnd = () => dragTodo('todo', list);
  const todoList = useMemo(() => {
    return list.map(todo => (
      <Item 
        key={todo.id}
        {...todo}
      />
    ))
  }, [list]);

  // if (list.length) {
  //   setBell(
  //     list.length && list
  //     .filter(todo => todo.date)
  //     .some(todo => new Date(todo.date).getTime() < new Date().getTime())
  //   );
  // }
  // const test = list.length && list
  //   .filter(todo => todo.date)
  //   .some(todo => new Date(todo.date).getTime() < new Date().getTime());
  
  // console.log(list.length, test);
  // setBell(
  //   list
  //   .filter(todo => todo.date)
  //   .some(todo => new Date(todo.date).getTime() < new Date().getTime())
  // );

  return (
    <div className="list">
      <ReactSortable
        list={list}
        setList={setList}
        animation={150}
        onEnd={handleDragEnd}
      >
        {todoList}
      </ReactSortable>
    </div>
  )
}

export default List;