/* eslint-disable */
import './App.css';
import { React, useState, useEffect } from 'react';
import Main from './main';
import Group from './Group';
let dataArr = [];
let temp = '';
let isPause = false;
let newarray = [];
console.log(dataArr)


function App() {

  const [dataArrState, setDataArrState] = useState([]);
  const [control, setControl] = useState();
  const [current, setCurrent] = useState(null);
  const [current2, setCurrent2] = useState('');

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



    const handleChildClick = (datafromchild) => {
        setDataArrState(datafromchild)
    }

    const sendSampl2 = (data) => {
      setCurrent(data)
      // data
      console.log('작동')
      console.log(current)
    }

    const sendSampl22 = (data) => {
      setCurrent2(data)
      console.log(current2)
    }

    console.log(current)

  return (
    <div className='MyContainer'>
    <Main dataArr={dataArr}
    dataArrState = {dataArrState}
    onChildClick = {handleChildClick}
    s1={sendSampl2}
    s2={sendSampl22}
    ></Main>
    <Group dataArr = {dataArr}
    dataArrState = {dataArrState}
    data = {current}
    ></Group>
    </div>
  )
}

export default App;
