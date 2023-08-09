// SpeechSynthesis.js

import React, { useEffect, useState } from 'react';

const SpeechSynthesis = ({ currentSubjectIndex, items }) => {
  const [currentQAIndex, setCurrentQAIndex] = useState(0);
  const [reading, setReading] = useState(false);

  useEffect(() => {
    if (currentSubjectIndex !== null && reading) {
      readQA(currentSubjectIndex, currentQAIndex);
    }
  }, [currentQAIndex]);

  useEffect(() => {
    if (currentSubjectIndex !== null) {
      setCurrentQAIndex(0);
      setReading(true);
    }
  }, [currentSubjectIndex]);

  const readQA = (subjectIndex, qaIndex) => {
    if (qaIndex < items[subjectIndex].qaPairs.length) {
      const qaPair = items[subjectIndex].qaPairs[qaIndex];
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `${qaPair.question}. ${qaPair.answer}`;
      speechSynthesis.speak(utterance);

      utterance.onend = () => {
        if (qaIndex < items[subjectIndex].qaPairs.length - 1 && reading) {
          setCurrentQAIndex(qaIndex + 1);
        } else {
          setReading(false);
        }
      };
    } else {
      setReading(false);
    }
  };

  return null;
};

export default SpeechSynthesis;
