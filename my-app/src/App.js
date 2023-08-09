// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import SubjectForm from './SubjectForm';
import SubjectList from './SubjectList';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  const handleSave = (newItem) => {
    const existingItem = items.find((item) => item.subject === newItem.subject);

    if (existingItem) {
      const updatedItems = items.map((item) =>
        item.subject === newItem.subject
          ? { ...item, qaPairs: [...item.qaPairs, newItem.qaPair] }
          : item
      );
      setItems(updatedItems);
      localStorage.setItem('items', JSON.stringify(updatedItems));
    } else {
      const updatedItems = [...items, { subject: newItem.subject, qaPairs: [newItem.qaPair] }];
      setItems(updatedItems);
      localStorage.setItem('items', JSON.stringify(updatedItems));
    }
  };

  return (
    <div className="App">
      <h1>TTS</h1>
      <SubjectForm onSave={handleSave} />
      <SubjectList items={items} />
    </div>
  );
}

export default App;




// [  { name1 : [{question : a, answer : b}, {question : c, answer : d}] }, { name2 : [{question : a, answer : b}, {question : c, answer : d}] } ]
// 전체이름 data : [] (dataArr)

// 음성 문제 
// 문답끼리의 간격 설정은 따로 해줘야함.

// 사용자 지정 시간 설정
// setTimeout을 썼는데 얘가 비동기 문제가 있어서 question을 다 읽고 answer를 읽음.

// 실시간으로 멈추는게 안됨 (chatgpt 코드 써도)


// 랜덤재생 확인하기
// dataArr의 형식이 바뀌면서 다시 수정해야함


// 편집
// 모달창을 띄우고 값을 받는 것까지는 구현
// 값을 고치고 수정하기 버튼을 누르면 c와 d state의 내용을 위의 3개의 map안의 qna.question, qna.answer에 넣어야함
// 그런데 모달창에서는 다른 div에 있는 안의 변수에 접근이 불가능 
