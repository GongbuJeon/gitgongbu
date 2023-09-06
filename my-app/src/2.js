import React, { useEffect, useState } from 'react';
import './App.css';
let newarray = [];

const Main = ({ dataArr, dataArrState, onChildClick, s1 }) => {


    let isPause = false;
    let [a, setA] = useState('');
    let [b, setB] = useState('');
    // const [dataArrState, setDataArrState] = useState([]);
    const [highlighted, setHighlighted] = useState(false);
    const [expandedSubject, setExpandedSubject] = useState(null);
    const [pause, setPause] = useState('일시정지');
    let [group, setGroup] = useState('');
    const [qnatimeA, setQnatimeA] = useState(2);
    const [qnatimeB, setQnatimeB] = useState(2);
    let send = ''
    

    const handleSubjectClick = (subjectName) => {
        if (expandedSubject === subjectName) {
          setExpandedSubject(null);
        } else {
          setExpandedSubject(subjectName);
          // document.querySelector('.group').classList.add('off')
        }
      };

      const handleHighlightToggle = () => {
        console.log(highlighted)
        setHighlighted(!highlighted);
      };

    const push = () => {
        if (group == '') {
            alert('그룹이 설정되지 않았습니다.')
        }

        else {
            dataArr.push({ name: group, QnA: [] })
            setGroup('')
            handleClick(dataArr)
            localStorage.setItem('data', JSON.stringify(dataArr));
        }
    }

    useEffect(() => {
        // setDataArrState(dataArr)
        console.log('use')
        console.log(dataArrState)
    }, [])

    useEffect(() => {
      setHighlighted(!highlighted);
    }, '~~~가 바뀌면')

    function createNewArrayWithIndices(array) {
        return array.map((_, index) => index);
      }

    const handleClick = (parameter) => {
        onChildClick(parameter)
    }

    const toSampl2 = (parameter) => {
        s1(parameter)
    }




    return (

        <div>
            {/* 그룹인풋 */}
            <div className={`group ${highlighted ? 'highlighted' : ''}`}>

                <input
                    placeholder='그룹추가'
                    value={group}
                    onChange={(e) => { setGroup(e.target.value) }}
                    onKeyDown={(e) => {
                        if (e.key == 'Enter') {
                            push();
                          }
                    }}
                    className='groupInput'
                ></input>

                <button
                    className='abc'
                    onClick={() => {
                        // 이 버튼을 누르면 그룹을 추가합니다. ( { name: "입력값", QnA: [ ] } )
                        push();
                    }}>+
                </button>

                <button
                    onClick={() => { document.querySelector(`.modalSetting`).classList.toggle('on-off') }}>설정
                </button>

                {/* <button
                    onClick={handleClick}
                >    
                </button> */}

            </div>

            {/* 제목 */}
            <div className='c'>
            {dataArrState.map((subject, index) => (   
                <div key={subject.name}>

            <div className={`subject ${highlighted ? 'highlighted' : ''}`}>
              <button
                className={`link ${highlighted ? 'highlighted' : ''}`}

                onClick={() => {
                  document.querySelector('.modalSetting').classList.remove('on-off')
                  handleSubjectClick(subject.name);
                  toSampl2(subject.name)
                  handleHighlightToggle();
                  isPause = true;
                  if (pause == '재개') {
                    setPause('일시정지')
                  }
                  newarray = createNewArrayWithIndices(subject.QnA)
                  console.log(newarray)

                }}
              >
                {subject.name}
              </button>
              <button
                className={`button2 ${highlighted ? 'highlighted' : ''}`}
                onClick={() => {
                  // 이 버튼을 누르면 object가 삭제됩니다.
                  var result = window.confirm('삭제 하시겠습니까?');

                  if (result) {
                    dataArr.splice(index, index + 1);
                    let rrrrr = [...dataArr];
                    handleClick(rrrrr)
                    setGroup('')
                    localStorage.setItem('data', JSON.stringify(dataArr));
                  }
                }}
              >x</button>
              </div>
            </div>       
            ))}
            </div>
            
            {/* 모달 */}

            <div className='modalSetting'>
        <div className='xbutton'>
          <button
            variant='secondary'
            onClick={() => { document.querySelector('.modalSetting').classList.toggle('on-off') }}>x</button>
        </div>

        <div>
          문답사이시간 :
          <input
            value={qnatimeA}
            onChange={(e) => { setQnatimeA(e.target.value) }}
            style={{ width: '30px' }}></input>
          초
        </div>

        <div>
          묶음사이시간 :
          <input
            value={qnatimeB}
            onChange={(e) => { setQnatimeB(e.target.value) }}
            style={{ width: '30px' }}></input>
          초
        </div>

      </div>   


            {/* <div className='MyModal'>

                <div className='xbutton'>
                    <button
                        onClick={() => { document.querySelector('.MyModal').classList.toggle('on-off') }}>x</button>
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
                        style={{ height: '100px' }}
                    ></input>
                </div>

            </div> */}
        </div>
    );
}
export default Main;
