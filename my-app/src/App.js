/*eslint-disable*/
import './App.css';
import { React, useState, useRef, useEffect } from 'react';
let dataArr = [];
let temp = '';
let newarr = [];


function App() {

  let [a, setA] = useState('');
  let [b, setB] = useState('');
  let [name, setName] = useState('');
  let [group, setGroup] = useState('');
  const [mode, setMode] = useState('sequential');
  const [dataArrState, setDataArrState] = useState([]);
  const [button, setButton] = useState('입력하기');
  
  let count = 0;
  let showdataArr = dataArr[count]
  // const [showdataArr, setShow] = useState(dataArr[count])

  let co = 0;

  const [expandedSubject, setExpandedSubject] = useState(null);
  const handleSubjectClick = (subjectName) => {
    if (expandedSubject === subjectName) {
      setExpandedSubject(null);
    } else {
      setExpandedSubject(subjectName);
    }
  };



  useEffect(() => {

    if (localStorage.getItem('data') !== null) {
      dataArr = JSON.parse(localStorage.getItem('data'));
      setDataArrState(dataArr);
    }

    return () => {
      console.log(localStorage.getItem('data'));
    }
  }, [])


  const Buttonchange = () => {
    if (mode == 'sequential') {
      setMode('random')
      document.querySelector('.off').classList.toggle('on-off')
      document.querySelector('.off2').classList.toggle('on-off')
    }

    else if (mode == 'random') {
      setMode('sequential')
      document.querySelector('.off').classList.toggle('on-off')
      document.querySelector('.off2').classList.toggle('on-off')
    }
  }

  const speak = (index) => {
    const speakCount = 0;
    // const utterance = new SpeechSynthesisUtterance(dataArr[0].QnA[0].question);
    // const utterance2 = new SpeechSynthesisUtterance(dataArr[0].QnA[0].answer);

    dataArr[index].QnA.map((body, index) => (

      newarr.push(body.question, body.answer),

        // newarr.map((aaaaaa, bbbbbb) => ())
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(body.question)),
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(body.answer))

    ))
  }

  const cancel = () => {
    speechSynthesis.cancel();
  }

  

  // useEffect(()=>{
  //   if (temp == 1) {
  //     setDataArrState(dataArr);
  //   }
  //   else {
  //     setDataArrState(dataArr);
  //   }
    
  // },[group])


  // const filteredItems = dataArrState.filter(item => item.name === dataArrState[0].name)

  return (
    <div className='container'>

      {/* <div>
        <button className='off on-off'
          onClick={Buttonchange}>
          순차재생</button>

        <button className='off2'
          onClick={() => {
            Buttonchange()
          }}>
          랜덤재생</button>
      </div> */}


      {/* 처음에 그룹추가하는 화면 */}
      <div>
      <input placeholder='그룹추가'
      value={group}
      onChange={(e) => { setGroup(e.target.value) }}
      style={{marginBottom : '50px'}}
      ></input>

      <button onClick={()=>{
        // 이 버튼을 누르면 그룹을 추가합니다. ( { name: "입력값", QnA: [ ] } )
          dataArr.push( { name : group, QnA : [ ] } ) 
          setGroup('')
          setDataArrState(dataArr);
          localStorage.setItem('data', JSON.stringify(dataArr));
          
        
          console.log(dataArrState)
      }}>+</button>
      </div>



      {/* 상세그룹 */}


      {/* <div>
{dataArrState.map((subject, index) => (
  <div key={index}>
    <h3>{subject.name}</h3>

    <button onClick={()=>{
      // 이 버튼을 누르면 해당 name의 하위 질문과 답을 입력할 수 있습니다.
      // 위의 방식과 동일.
      setName(subject.name)
    }}>+</button>

    <button>음성</button>

    <ul>
      {subject.QnA.map((qa, qaIndex) => (
        <li key={qaIndex}>
          {qa.question}
          <br></br>
          {qa.answer}
          <br></br>
          <button onClick={()=>{
            // 이 버튼을 누르면 버튼 이름이 수정하기로 바뀌며, 
            // 그룹, 질문, 답이 설정됩니다.
            // 변경하면 해당 내용이 덮어씌워집니다.
            setButton('수정하기');
            setName(subject.name);
            setA(qa.question);
            setB(qa.answer);
            subject.QnA.splice();
            // 얘의 상위 인덱스, 하위 인덱스를 전역변수에 받아줌. 밑에서 그거를 수정하는 식.
            // subject를 받아주고 한번 해보자.
            
            temp = qa;
            console.log(temp);

          }}>수정</button>
          <button onClick={()=>{
            // 이 버튼을 누르면 문답이 사라집니다.
            console.log(subject.QnA[qaIndex]);
            subject.QnA.splice(qaIndex, qaIndex+1);
            console.log(subject.QnA[qaIndex]);
            localStorage.setItem('data', JSON.stringify(dataArr));
            setDataArrState(dataArr);
          }}>x</button>
        </li>
      ))}
    </ul>
    
  </div>
))}
</div> */}

      <div>
        {dataArrState.map((subject, index) => (
          <div key={subject.name}>

            <div style={{display : 'flex'}}>
            <a href='#'
              onClick={() => handleSubjectClick(subject.name)}
              style={{fontSize : '25px', flexGrow : 1}}
              >
              {subject.name}
            </a>
            <button onClick={() => {
              // 이 버튼을 누르면 object가 삭제됩니다.
              var result = window.confirm('삭제 하시겠습니까?');

              if (result) {
                dataArr.splice(index, index + 1);
                console.log(dataArr);
                setGroup('')
                setDataArrState(dataArr);
                localStorage.setItem('data', JSON.stringify(dataArr));
                console.log(dataArrState)
              }
            }}
            >x</button>
            </div>
            

            {expandedSubject === subject.name && (
              <div>
                <h1>{subject.name}</h1>
                <div style={{display : 'flex', justifyContent : 'flex-end'}}>
                  <button onClick={() => {
                    document.querySelector('.modal').classList.toggle('on-off');
                    setName(subject.name)
                  }}>+</button>
              <button onClick={()=> {speak(index)}}>음성</button>
              <button onClick={cancel}>중지</button>
                </div>
              <div>
                {subject.QnA.map((qna, index) => (
                  
                  <div key={index} style={{marginBottom : '60px'}}>
                    
                    <p>질문: {qna.question}</p>
                    <p>답변: {qna.answer}</p>
                    <button onClick={() => {
                      // 이 버튼을 누르면 버튼 이름이 수정하기로 바뀌며, 
                      // 그룹, 질문, 답이 설정됩니다.
                      // 변경하면 해당 내용이 덮어씌워집니다.
                      setButton('수정하기');
                      setName(subject.name);
                      setA(qna.question);
                      setB(qna.answer);
                      subject.QnA.splice();
                      document.querySelector('.modal').classList.toggle('on-off')
                      // 얘의 상위 인덱스, 하위 인덱스를 전역변수에 받아줌. 밑에서 그거를 수정하는 식.
                      // subject를 받아주고 한번 해보자.

                      temp = qna;
                      console.log(temp);

                    }}>수정</button>

                    <button onClick={() => {
                      // 이 버튼을 누르면 문답이 사라집니다.
                      var result = window.confirm('삭제 하시겠습니까?');

                      if (result) {
                        subject.QnA.splice(index, index + 1);
                        localStorage.setItem('data', JSON.stringify(dataArr));
                        setDataArrState(dataArr);
                      }

                    }}>x</button>

                  </div>
                ))}
              </div>
              </div>
            )}
          </div>
        ))}
      </div>




      {/* 모달창 */}

      <div className='modal'>

        <div className='xbutton'>
        <button onClick={()=>{document.querySelector('.modal').classList.toggle('on-off')}}>x</button>
        </div>

        <div>
          <input placeholder='그룹'
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          ></input>
        </div>

        <div>
          <input
            placeholder='질문'
            value={a}
            onChange={(e) => { setA(e.target.value) }}
          ></input>
        </div>

        <div>
          <input placeholder='답'
            value={b}
            onChange={(e) => { setB(e.target.value) }}
            style={{height: '100px'}}
          ></input>
        </div>

        <div>

          <button onClick={() => {

            if (name == '') {
              alert('그룹을 지정해 주세요.')
            }



            else {
              const obj = { 'question': a, 'answer': b }
              const input = { name: name, QnA: [obj] }
              const datafind = dataArr.find(obj => obj['name'] === name)

              if (button == '수정하기') {
                temp.question = a
                temp.answer = b
                console.log(temp)
                console.log(dataArr)
                localStorage.setItem('data', JSON.stringify(dataArr));
                setDataArrState(dataArr)
              }



              else {


                if (datafind == undefined) {

                  console.log('중복되는 name이 없음')
                  dataArr.push(input)
                  console.log(dataArr)
                  console.log(dataArrState)

                }

                else {

                  console.log('중복되는 name이 있음')

                  const newdata = dataArr.map(item => {
                    if (item.name === name) {
                      return { ...item, ...item.QnA.push(obj) }
                    }
                    return item;
                  })
                  // 위의 item은 키가 아닌 object 전체를 나타내는 거였음

                  console.log(newdata);
                  dataArr = newdata;
                  console.log(dataArrState);

                }

                setDataArrState(dataArr);
                localStorage.setItem('data', JSON.stringify(dataArr));

                setA('')
                setB('')
                document.querySelector('.modal').classList.toggle('on-off')
              }
            }

          }}
          style={{marginTop : '30px'}}
          >{button}</button>

        </div>
      </div> 

    </div>
  );
}

export default App;

// 삭제, 수정 비동기 문제
// 음성 추가하기
// UI 만들기 -
// 1. 메인을 그룹추가, 수학, 영어만 남기기. 
// 서브젝트 중 하나를 클릭하면 / 그룹 보여주는거를 숨기고 / 해당 하위 내용을 보여주기
// 수정, x 버튼 오른쪽으로 옮기기

//
