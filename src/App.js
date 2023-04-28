/* eslint-disable */
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let [title, setTitle] = useState('');
  let [temptitle, setTemptitle] = useState('');
  let [memo, setMemo] = useState('');
  let [tempmemo, setTempmemo] = useState('');
  let [starttime, setStarttime] = useState('');
  let [tempstarttime, setTempstarttime] = useState('');
  let [endtime, setEndtime] = useState('');
  let [tempendtime, setTempendtime] = useState('');
  let date = new Date();
  // 오늘 날짜 가져오는 방식
  // let [year, month, day] = [date.getFullYear(), date.getMonth()+1, date.getDate()]
  // let userdate = 2023-04-27
  var starttimehour = parseInt(starttime.split(":")[0], 10);
  var starttimeminute = parseInt(starttime.split(":")[1], 10);
  var endtimehour = parseInt(endtime.split(":")[0], 10);
  var endtimeminute = parseInt(endtime.split(":")[1], 10);
  let boxheight = ((endtimehour-starttimehour) * 60 + (endtimeminute-starttimeminute)) * 0.4166
  let boxmargin = (starttimehour * 60 + starttimeminute) * 0.41666
  // let [array, setArray] = useState([]);
  let [today, setToday] = useState('')
  let task = {}
  let [dayTask, setDayTask] = useState([])
  let dayobject = {}


  function add(a, key, value) {
    a[key] = value;
    console.log('value>', value)
    console.log('add>', a, value)
    return a
  }

  let title0 = '';

  return (
    <div className="container">


      <input type='date' onChange={(e) => 
        { setToday(e.target.value), setDayTask([]) }
        }></input>
      {/* <div>{year}년 {month}월 {day}일</div> */}
      <div className='modal-text'>
        <div><button style={{ float: 'right' }} onClick={() => {
          document.querySelector('.modal-text').classList.toggle
          ('show-modal')
        }}>x</button></div>
        <input style={{ margin: '20px' }} type='text' placeholder='Plan'
          onChange={(e) => { 
            // setTemptitle(e.target.value)
            title0 = e.target.value; 
            }}></input>
        <div>
          <div style={{ margin: '10px' }}>시작시간 : <input type='time' onChange={(e) => { setTempstarttime(e.target.value) }}></input></div>
          <div style={{ margin: '10px' }}>종료시간 : <input type='time' onChange={(e) => { setTempendtime(e.target.value) }}></input></div>
        </div>
        <input type='text' placeholder='상세메모'
          onChange={(e) => { setTempmemo(e.target.value) }}></input>
        <input style={{ margin: '20px' }} type='text' placeholder='해쉬태그'></input>
        <div style={{ margin: '20px' }}>
          <button onClick={() => {
            // console.log('temptitle>', temptitle)
          setTitle(title0); 
          setMemo(tempmemo);
          setStarttime(tempstarttime); 
          setEndtime(tempendtime); 

          // let copy = [...array]
          // copy.push([temptitle, tempmemo, tempstarttime, tempendtime, boxheight, boxmargin]);
          // setArray(copy);
          // console.log(array);
          // console.log(array[0]);

          console.log('title>', title)
          add(task, 'title', title), 
          console.log("task0>", task);  

          add(task, 'memo', memo), 
          add(task, 'starttime', tempstarttime), 
          add(task, 'endtime', endtime),
          add(task, 'boxheight', boxheight), 
          add(task, 'boxmargin', boxmargin)
          
          setTimeout(() => {
            console.log("task>", task);  
          }, 1);
          
          dayTask.push(task);
          console.log("dayTask>",dayTask);
          add(dayobject, 'id', today);
          add(dayobject, 'task', dayTask);
          console.log("dayobject>", dayobject);

          document.querySelector('.modal-text').classList.toggle('show-modal')
        
          // reset
          title0 = ''
        }}>입력</button></div>
      </div>

      <div className="container1">
        {
          dayTask.map((a,i)=>{
            return(
              <div style={{marginTop: dayTask[i].boxmargin, width: '50%', maxWidth: '350px',
              height: dayTask[i].boxheight, backgroundColor: 'yellow', textAlign: 'center'}}></div>
            )
          })
        }
        <div style={{
          marginTop: '10px', width: '50%',
          height: '10px', backgroundColor: 'orange', textAlign: 'center'
        }}></div>
      </div>

      <button onClick={() => {
        document.querySelector('.modal-text').classList.toggle
        ('show-modal')
      }}>보이기</button>
    </div>
  );
}

// 이전 스타일
{/* <div style={{
          marginTop: '50px', width: '50%', maxWidth: '350px',
          height: '50px', backgroundColor: 'yellow', textAlign: 'center'}}>
          {title}
        </div> */}





// function App{
//   return(

//    )
// }




// {console.log(title, memo, starttime, endtime, boxheight)}

// function App() {
//   const [inputs, setInputs] = useState({
//     name: '',
//     nickname: ''
//   });

//   const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

//   const onChange = (e) => {
//     const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
//     setInputs({
//       ...inputs, // 기존의 input 객체를 복사한 뒤
//       [name]: value // name 키를 가진 값을 value 로 설정
//     });
//   };

//   const onReset = () => {
//     setInputs({
//       name: '',
//       nickname: '',
//     })
//   };

//   return (
//     <div>
//       <input name="name" placeholder="이름" onChange={onChange} value={name} />
//       <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
//       <button onClick={"입력 버튼을 눌렀을때 name이 name인 부분의 "}>입력</button>
//       <button onClick={onReset}>초기화</button>
//       <div>
//         <b>값: </b>
//         {name} ({nickname})
//         {console.log(inputs)}
//       </div>
//     </div>
//   )
// }
export default App;
