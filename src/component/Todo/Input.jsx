import React, { useState } from 'react';
import useInput from '../../hooks/useInput';
import useTodo from '../../hooks/useTodo';
import { getMinDate } from '../../utils';

const Input = () => {
  const {
    input,
    setTitle,
    setText,
    setDate,
  } = useInput();
  const { title, text, date } = input;
  const { putTodo } = useTodo();
  const [ isExpiredDate, setIsExpiredDate ] = useState(false);

  const handleChange = (e) => {
    const {
      name, value,
    } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'text':
        setText(value);
        break;
      case 'date':
        setDate(value);
        break;
      default:
        break;
    }
  };
  const handleInsert = () => {
    if (!title.length) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!text.length) {
      alert('내용을 입력해주세요.');
      return;
    }
    if (new Date(date).getTime() < new Date().getTime()) {
      alert('현재시간 보다 이전 시간은 선택할 수 없습니다.');
      return;
    }
    putTodo('todo', input);
  };

  return (
    <div className="input">
      <input 
        type="text"
        name="title"
        onChange={handleChange}
        value={title}
        placeholder="제목을 입력해주세요.(필수)"
      />
      <input 
        type="text"
        name="text"
        onChange={handleChange}
        value={text}
        placeholder="내용을 입력해주세요.(필수)"
      />
      {
        !isExpiredDate ? 
        <button type="button" onClick={
          () => {
            setIsExpiredDate(status => !status);
          }
        }>
          마감기한 선택
        </button> : 
        <input 
          type="datetime-local"
          name="date"
          onChange={handleChange}
          min={getMinDate()}
          value={date}
        />
      }
      <div className="add-button" onClick={handleInsert}>Add</div>
    </div>
  );
};

export default Input;