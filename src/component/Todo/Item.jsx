import React, { useState } from 'react';
import useTodo from '../../hooks/useTodo';
import { dateFormat, getMinDate } from '../../utils';

const Item = ({id, title, done, text, date}) => {
  const [ isEdit, setIsEdit ] = useState(false);
  const [ input, setInput ] = useState({
    title, text, date,
  });
  const {
    deleteTodo,
    toggleTodo,
    editTodo,
  } = useTodo();

  const handleEdit = () => {
    if (isEdit) {
      // if (new Date(input.date).getTime() < new Date().getTime()) {
      //   alert('현재시간 보다 이전 시간은 선택할 수 없습니다.');
      //   return;
      // }
      editTodo('todo', id, input)
    };
    setIsEdit(flag => !flag);
  };
  
  const handleChange = (e) => {
    const {
      name, value
    } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  const {
    title: inputTitle,
    text: inputText,
    date: inputDate,
  } = input;

  return (
    <div className="item">
      <input type="checkbox" 
        className="tick" 
        onClick={() => toggleTodo('todo', id)} 
        checked={done} 
        readOnly
      />
      <div className="text-container">
        {
          !isEdit ? <div className={`title ${done && 'done'}`}>[title] {title}</div> 
          :
          <>
            title: 
            <input 
              type="text" 
              name="title" 
              onChange={handleChange} 
              value={inputTitle}
              placeholder="타이틀을 입력해주세요."
            />
          </>
        }
        <br />
        {
          !isEdit ? <div className={`text ${done && 'done'}`}>[content] {text}</div>
          :
          <>
            content:
            <input 
              type="text" 
              name="text" 
              onChange={handleChange} 
              value={inputText}
            />
          </>
        }
      </div>
      {
        !isEdit ? 
        date ? <div className='date'>[마감기한]<br />{dateFormat(date)}</div> : null : 
          <input 
          type="datetime-local" 
          name="date"
          onChange={handleChange} 
          min={getMinDate()}
          value={inputDate}
        />
      }
      <div className="edit" onClick={handleEdit}>
        {
          !isEdit ? `[edit]` : `[save]`
        }
      </div>
      <div className="delete" onClick={() => deleteTodo('todo', id)}>[delete]</div>
    </div>
  );
};

export default Item;