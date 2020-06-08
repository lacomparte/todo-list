import React, { useState, Fragment } from 'react';
import useTodo from '../../hooks/useTodo';
import { dateFormat, getMinDate } from '../../utils';

const Item = ({id, title, done, text, date, expired}) => {
  const [ isEdit, setIsEdit ] = useState(false);
  const [ moreView, setMoreView ] = useState(false);
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
    <div className={`item${expired ? ' expired' : ''}`}
      onClick={() => setMoreView(status => !status)}
    >
      {!isEdit ? 
        <div className="item_chk">
          <input type="checkbox" 
            className="tick" 
            onClick={(e) => {
              e.stopPropagation();
              toggleTodo('todo', id)
            }} 
            checked={done} 
            readOnly
          />
        </div> : null
      }
      <div className={`item_box${isEdit ? ' editing' : ''}`}>
        <div className="text-container">
          {
            !isEdit ? <div className={`title${done ? ' done' : ''}`}>[title] {title}</div> 
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
          {
            !isEdit ? 
            date ? <div className={`date${done ? ' done' : ''}`}>[마감기한] {dateFormat(date)}</div> : null : 
            <>
              <br />
              date:
              <input 
                type="datetime-local" 
                name="date"
                onChange={handleChange} 
                min={getMinDate()}
                value={inputDate}
              />
            </>
          }
          {
          !isEdit ? 
            <div className={`text${done ? ' done' : ''}${moreView ? ' expand' : ''}`}>[content] {text.split('\n').map((line, idx) => (<Fragment key={idx}>{line}<br/></Fragment>))}</div>
            :
            <>
              <br />
              content:
              <br />
              <textarea 
                type="text" 
                name="text" 
                onChange={handleChange} 
                value={inputText}
                style={{
                  width: '80%',
                  height: '45%',
                  resize: 'none',
                }}
              />
            </>
          }
        </div>
        <div className="item_btn">
          <div className="delete" onClick={() => deleteTodo('todo', id)}>DELETE</div>
          <div className="edit" onClick={handleEdit}>
            {
              !isEdit ? `EDIT` : `SAVE`
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;