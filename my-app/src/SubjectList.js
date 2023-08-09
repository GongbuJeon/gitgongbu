// SubjectList.js

import React, { useState } from 'react';

const SubjectList = ({ items }) => {
    const [currentSubjectIndex, setCurrentSubjectIndex] = useState(null);
    //   const [currentQAIndex, setCurrentQAIndex] = useState(0);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedQuestion, setEditedQuestion] = useState('');
    const [editedAnswer, setEditedAnswer] = useState('');

  const handleStartReading = (index) => {
    setCurrentSubjectIndex(index);
    // setCurrentQAIndex(0);
    readNextQA(index, 0);
  };

  const readNextQA = (subjectIndex, qaIndex) => {
    if (subjectIndex !== currentSubjectIndex) {
      return; // Stop reading if subject has changed
    }

    if (qaIndex < items[subjectIndex].qaPairs.length) {
      const qaPair = items[subjectIndex].qaPairs[qaIndex];
      const utterance = new SpeechSynthesisUtterance();
      const utterance2 = new SpeechSynthesisUtterance();
      utterance.text = `${qaPair.question}`;
      utterance2.text = `${qaPair.answer}`
      speechSynthesis.speak(utterance);
      speechSynthesis.speak(utterance2);

      utterance.onend = () => readNextQA(subjectIndex, qaIndex + 1);
    }
  };


  const handleEditClick = (qaIndex) => {
    setEditingIndex(qaIndex);
    setEditedQuestion(items[currentSubjectIndex].qaPairs[qaIndex].question);
    setEditedAnswer(items[currentSubjectIndex].qaPairs[qaIndex].answer);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[currentSubjectIndex].qaPairs[editingIndex].question = editedQuestion;
      updatedItems[currentSubjectIndex].qaPairs[editingIndex].answer = editedAnswer;
      setEditingIndex(null);
      setEditedQuestion('');
      setEditedAnswer('');
    }
  };

  const handleDelete = (qaIndex) => {
    const updatedItems = [...items];
    updatedItems[currentSubjectIndex].qaPairs.splice(qaIndex, 1);
    setEditingIndex(null);
    setEditedQuestion('');
    setEditedAnswer('');
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <strong>종류: {item.subject}</strong>
            <br />
            {item.qaPairs.map((qaPair, qaIndex) => (
              <div key={qaIndex}>
                {editingIndex === qaIndex ? (
                  <div>
                    <input
                      type="text"
                      value={editedQuestion}
                      onChange={(e) => setEditedQuestion(e.target.value)}
                    />
                    <input
                      type="text"
                      value={editedAnswer}
                      onChange={(e) => setEditedAnswer(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit()}>저장</button>
                  </div>
                ) : (
                  <div>
                    질문: {qaPair.question}{' '}
                    <br />
                    답: {qaPair.answer}{' '}
                    <button onClick={() => handleEditClick(qaIndex)}>수정</button>
                    <button onClick={() => handleDelete(qaIndex)}>삭제</button>
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => handleStartReading(index)}>읽기</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectList;















