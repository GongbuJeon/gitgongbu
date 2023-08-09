// SubjectForm.js

import React, { useState } from 'react';

const SubjectForm = ({ onSave }) => {
  const [subject, setSubject] = useState('');
  const [qaPair, setQAPair] = useState({ question: '', answer: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !qaPair.question || !qaPair.answer) return;

    const newItem = {
      subject,
      qaPair: { ...qaPair },
    };

    onSave(newItem);
    setQAPair({ question: '', answer: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>종류: </label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div>
          <label>질문: </label>
          <input
            type="text"
            value={qaPair.question}
            onChange={(e) => setQAPair({ ...qaPair, question: e.target.value })}
          />
        </div>
        <div>
          <label>답: </label>
          <input
            type="text"
            value={qaPair.answer}
            onChange={(e) => setQAPair({ ...qaPair, answer: e.target.value })}
          />
        </div>
        <button type="submit">입력하기</button>
      </form>
    </div>
  );
};

export default SubjectForm;



