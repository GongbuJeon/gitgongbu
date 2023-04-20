import './App.css';
import { useState } from 'react';

function App() {
  let [제목, 제목변경] = useState('');
  let [임시제목, 임시제목변경] = useState('');
  let [내용, 내용변경] = useState('');
  let [임시내용, 임시내용변경] = useState('');
  let [시작시간, 시작시간변경] = useState('');
  let [임시시작시간, 임시시작시간변경] = useState('');
  let [종료시간, 종료시간변경] = useState('');
  let [임시종료시간, 임시종료시간변경] = useState('');
  let [현재상태, 현재상태변경] = useState('메인');
  let today = new Date();
  let [date, hours, minutes] = [today.getDate(), today.getHours(), today.getMinutes()]
  var 시작시간시 = parseInt(시작시간.split(":")[0], 10);
  var 시작시간분 = parseInt(시작시간.split(":")[1], 10);
  var 종료시간시 = parseInt(종료시간.split(":")[0], 10);
  var 종료시간분 = parseInt(종료시간.split(":")[1], 10);
  let 박스높이 = ((종료시간시-시작시간시) * 60 + (종료시간분-시작시간분)) * 0.4166
  let 박스마진 = (시작시간시 * 60 + 시작시간분) * 0.41666
  var cart = {}
  cart.제목 = 제목; cart.내용 = 내용; cart.시작시간 = 시작시간; cart.종료시간 = 종료시간;


  return (
    <div className="container">
      {/* {제목}
      {내용} */}
      <div className='modal-text' style={{ display: 'flex', flexDirection: 'column' }}>
        <div><button style={{ float: 'right' }}>x</button></div>
        <input style={{ margin: '20px' }} type='text' placeholder='제목'
          onChange={(e) => { 임시제목변경(e.target.value) }}></input>
        <div>
          <div>시작시간 : <input type='time' onChange={(e) => { 임시시작시간변경(e.target.value) }}></input></div>
          <div style={{ margin: '10px' }}>종료시간 : <input type='time' onChange={(e) => { 임시종료시간변경(e.target.value) }}></input></div>
        </div>
        <input type='text' placeholder='상세메모'
          onChange={(e) => { 임시내용변경(e.target.value) }}></input>
        <input style={{ margin: '20px' }} type='text' placeholder='해쉬태그'></input>
        <div style={{ margin: '20px' }}><button onClick={() => {
          제목변경(임시제목); 내용변경(임시내용);
          시작시간변경(임시시작시간); 종료시간변경(임시종료시간)
        }}>입력</button></div>
      </div>
      <div className="container1">
        <div style={{
          marginTop: 박스마진, width: '50%',
          height: 박스높이, backgroundColor: 'yellow', textAlign: 'center'
        }}>{제목}</div>
        <div style={{
          marginTop: 박스마진, width: '50%', 
          height: 박스높이, backgroundColor: 'orange', textAlign: 'center'
        }}></div>
      </div>
      {console.log(제목, 내용, 시작시간, 종료시간, 박스높이)}
    </div>
    // <button style={{float : 'right'}}>x</button>

  );
}

// function App() {

//   // var cart = {}
//   // cart.제목 = 제목; cart.메모 = 내용;

//   return (

//     <div className = "container1">
//       <div style={{marginTop : '10px', width : '50%', 
//       height : '20%', backgroundColor : 'darkblue', textAlign : 'center'}}>123</div>
//     </div>

//   );
// }



// 현재상태 == 상세 버튼을 누르면 내용을 보여주는 모달 띄우는 상태
// +버튼을 누르면 수정항목을 보여주는 모달 띄우는 상태
// 현재상태 == 상세 ? 상세css컴포넌트 : null
/* <div>
      <input type='text' placeholder='입력하기'
        onChange={(e)=>{입력값변경(e.target.value)}}></input>
      <input type='text' placeholder='수정하기'
        onChange={(e)=>{수정값변경(e.target.value)}}>
      </input>
      </div>
      <button onClick={()=>{
        let 내용2 = [...내용];
        내용2.push(입력값);
        내용변경(내용2);
      }}>추가하기</button>
      <button onClick={()=>{
        내용변경(수정값);
      }}>수정하기</button>
      <button onClick={()=>{
        내용변경('');
      }}>삭제하기</button>
      <p>{내용}</p> */

export default App;
