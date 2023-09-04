/* eslint-disable */
import './App.css';
import { React, useState, useEffect } from 'react';
import Sampl1 from './sampl1';
import Sampl2 from './sampl2';
let dataArr = [];
let temp = '';
let isPause = false;
let newarray = [];
console.log(dataArr)


function App() {

  const [dataArrState, setDataArrState] = useState([]);
  const [control, setControl] = useState();

  useEffect(() => {

    if (localStorage.getItem('data') !== null) {
      dataArr = JSON.parse(localStorage.getItem('data'));
      console.log(1)
      setDataArrState(dataArr);
    }
    speechSynthesis.resume();
    speechSynthesis.cancel();

    setDataArrState(dataArr)
    console.log(dataArrState)
    console.log(dataArr)
    console.log('useEffect')
    return () => {
      console.log(localStorage.getItem('data'));
    }
  }, [])

  const handleChild = (childData) => {
    console.log(childData);
  }

  return (
    <div className='MyContainer'>
    <Sampl1 dataArr={dataArr}
    dataArrState = {dataArrState}
    abc = {handleChild()}
    ></Sampl1>
    <Sampl2 dataArr={dataArr}
    dataArrState = {dataArrState}
    ></Sampl2>
    </div>
  )
}

export default App;
