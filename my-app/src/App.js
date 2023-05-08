/* eslint-disable */
import './App.css';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

function App() {
  let [mode, setMode] = useState('plan');
  let [temptitle, setTemptitle] = useState('');
  let [tempmemo, setTempmemo] = useState('');
  let [tempstarttime, setTempstarttime] = useState('');
  let [tempendtime, setTempendtime] = useState('');
  let date = new Date();
  // 오늘 날짜 가져오는 방식
  // let [year, month, day] = [date.getFullYear(), date.getMonth()+1, date.getDate()]
  // let userdate = 2023-04-27
  var starttimehour = parseInt(tempstarttime.split(":")[0], 10);
  var starttimeminute = parseInt(tempstarttime.split(":")[1], 10);
  var endtimehour = parseInt(tempendtime.split(":")[0], 10);
  var endtimeminute = parseInt(tempendtime.split(":")[1], 10);
  let boxheight = ((endtimehour - starttimehour) * 60 + (endtimeminute - starttimeminute)) * 0.4166
  let boxmargin = (starttimehour * 60 + starttimeminute) * 0.41666
  let [today, setToday] = useState('')
  let [dayTaskPlan, setdayTaskPlan] = useState([])
  let dayObjectPlan = {}
  let [dayTaskDo, setdayTaskDo] = useState([])
  let dayObjectDo = {}

  let local = useRef([])

  useEffect(() => {
    console.log(mode);
  }, [mode]);

  function add(a, key, value) {
    a[key] = value;
    return a
  }

  return (
    <div className="container">

      <input type='date' onChange={(e) => { 
        setToday(e.target.value), setdayTaskPlan([])
    }
      }></input>
      {/* <div>{year}년 {month}월 {day}일</div> */}
      <div className='modal-text'>
        <div><button style={{ float: 'right' }} onClick={() => {
          document.querySelector('.modal-text').classList.toggle
            ('show-modal')
        }}>x</button></div>
        <input style={{ margin: '20px' }} type='text' placeholder='Plan'
          value={temptitle} onChange={(e) => {
            setTemptitle(e.target.value)
          }}></input>
        <div>
          <div style={{ margin: '10px' }}>시작시간 : <input type='time' value={tempstarttime} onChange={(e) => { setTempstarttime(e.target.value) }}></input></div>
          <div style={{ margin: '10px' }}>종료시간 : <input type='time' value={tempendtime} onChange={(e) => { setTempendtime(e.target.value) }}></input></div>
        </div>
        <input type='text' placeholder='상세메모' value={tempmemo}
          onChange={(e) => { setTempmemo(e.target.value) }}></input>
        <input style={{ margin: '20px' }} type='text' placeholder='해쉬태그'></input>
        <div style={{ margin: '20px' }}>
          <button onClick={() => {
            const task = {
              title: temptitle,
              memo: tempmemo,
              starttime: tempstarttime,
              endtime: tempendtime,
              boxheight: boxheight,
              boxmargin: boxmargin
            }
            if (mode == 'plan') {
              dayTaskPlan.push(task);
              add(dayObjectPlan, 'id', today);
              add(dayObjectPlan, 'task', dayTaskPlan);
              // localStorage.setItem('plan', JSON.stringify(dayObjectPlan));
            }
            else {
              dayTaskDo.push(task);
              add(dayObjectDo, 'id', today);
              add(dayObjectDo, 'task', dayTaskDo);
              // localStorage.setItem('do', JSON.stringify(dayObjectDo));
            }

            add(local, 'plan', dayObjectPlan)
            add(local, 'do', dayObjectDo)

            if (localStorage.length == 0)
            {localStorage.setItem('do', JSON.stringify(local));}

            else 
            {const getData = JSON.parse(localStorage.getItem('do'));
            console.log(getData)
            getData.today = dayTaskPlan;
            localStorage.setItem('do', JSON.stringify(getData));
            }

            document.querySelector('.modal-text').classList.toggle('show-modal')

            // reset
            setTemptitle('')
            setTempmemo('')
            setTempstarttime('')
            setTempendtime('')


          }}>입력</button></div>
      </div>

      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        <div className='time'>시간</div>
        <div className="container1">
          <div style={{ width: '50%', height: '100%', position: 'relative' }}>
            {
              dayTaskPlan.map((a, i) => {
                return (
                  <div style={{
                    marginTop: dayTaskPlan[i].boxmargin, width: '100%', maxWidth: '350px',
                    height: dayTaskPlan[i].boxheight, backgroundColor: 'yellow', textAlign: 'center'
                    , position: 'absolute'
                  }}></div>
                )
              })
            }
          </div>

          <div style={{ width: '50%', height: '100%', position: 'relative' }}>
            {
              dayTaskDo.map((a, i) => {
                return (
                  <div style={{
                    marginTop: dayTaskDo[i].boxmargin, width: '100%', maxWidth: '350px',
                    height: dayTaskDo[i].boxheight, backgroundColor: 'orange', textAlign: 'center'
                    , position: 'absolute'
                  }}></div>
                )
              })
            }
          </div>
        </div>
      </div>

      <button onClick={() => {
        setMode('plan');
        document.querySelector('.modal-text').classList.toggle
          ('show-modal')
      }}>plan</button>

      <button onClick={() => {
        setMode('do');
        document.querySelector('.modal-text').classList.toggle
          ('show-modal')
      }}>do</button>

      <button onClick={() => {
        console.log(localStorage)
      }}>확인</button>


    </div>
  );
}

// localStorage.setItem('데이터이름', JSON.stringify({name:'kim'}) );
// array나 object localstorage에 집어 넣기
// Json.parse(localStorage.getItem('데이터이름'))

export default App;