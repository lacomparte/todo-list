import React from 'react';
import useTodo from '../../hooks/useTodo';

const Item = ({id, title, done, text, date}) => {
  const {
    deleteTodo,
    toggleTodo,
  } = useTodo();

  const handleDelete = () => {
    deleteTodo('todo', id);
  }

  const handleToggle = () => {
    toggleTodo('todo', id);
  }
  
  const dateFormat = () => {
    const expiredDate = new Date(date);
    const dateTimeFormat = new Intl.DateTimeFormat('ko', { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return dateTimeFormat.formatToParts(expiredDate).reduce((prevVal, currVal, idx) => 
      idx === 0 ? currVal.value : prevVal + currVal.value
      , '');
  }

  return (
    <div className="item">
      <input type="checkbox" 
        className="tick" 
        onClick={handleToggle} 
        checked={done} 
        readOnly
      />
      <div className={`text ${done && 'done'}`}>{title}</div>
      {
        date ? 
        <div className='date'>{dateFormat()}</div> : null
      }
      <div className="edit">[edit]</div>
      <div className="delete" onClick={handleDelete}>[delete]</div>
    </div>
  );
};

export default Item;