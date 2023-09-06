import React, { useEffect, useState } from 'react';
import './App.css';
let isPause = false;
let newarray = [];
let temp = '';


const Group = ({ dataArr, dataArrState, data, s2 }) => {

    let [a, setA] = useState('');
    let [b, setB] = useState('');
    // const [dataArrState, setDataArrState] = useState([]);
    // const [expandedSubject, setExpandedSubject] = useState(null);
    const [pause, setPause] = useState('일시정지');
    let [name, setName] = useState('');
    let [color, setColor] = useState('red');
    const [play, setPlay] = useState('재생');
    const [random, setRandom] = useState('랜덤');
    const [qnatimeA, setQnatimeA] = useState(2);
    const [highlighted, setHighlighted] = useState(false);
    const [expandedSubject, setExpandedSubject] = useState(data);
    const [button, setButton] = useState('입력하기');


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

    const speakText = (text, textArray, index) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.onend = (event) => {
            console.log('끝남')
            setTimeout(() => {
                console.log('settimeout 후 시작')
                speakSequentially(textArray, index + 1);
            }, qnatimeA * 1000);
        }

        synth.speak(utterance);


        if (index % 2 == 0) {
            console.log('짝수')
            if (speechSynthesis.paused == false) {
                setColor(textArray[index])
            }
        }

        else {
            console.log('홀수')
            if (speechSynthesis.paused == false) {
                setColor(textArray[index - 1])
            }
        }



    };

    const speakQnASequentially = (qnaList) => {
        isPause = false;
        let textArray = [];
        qnaList.forEach(qna => {
            textArray.push(qna.question);
            textArray.push(qna.answer);
        });
        speakSequentially(textArray, 0);
    };

    const speakSequentially = (textArray, index) => {

        if (index < textArray.length && isPause == false) {
            console.log(newarray)

            if (index % 2 == 0) {
                speakText(textArray[index], textArray, index);
                // setColor(textArray[index])
            }

            else {
                speakText(textArray[index], textArray, index);
                // setColor(textArray[index-1])
            }

        }

        // length는 넘어갔는데 ispause는 false가 아닐때
        else if (index >= textArray.length && isPause == false) {
            console.log(textArray)
            speakSequentially(textArray, 0)
        }

        else if (isPause == true) {
            console.log(isPause)
            speechSynthesis.cancel();
        }

    };

    const randomize = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    const toSampl22 = (parameter) => {
        s2(parameter)
    }


    useEffect(() => {
        // setDataArrState(dataArr);
    }, [])

    console.log(expandedSubject)
    console.log(data)
    // expandedSubject === subject.name

    return (
        <> 
        <div className='c'>
            {dataArrState.map((subject, index) => (
                <div key={subject.name} id={index}>
                    {data === subject.name && (
                        <div>
                            <div>
                                <h1 className='main'>{subject.name}</h1>
                                <button
                                    variant='light'
                                    className='back'
                                    onClick={() => {
                                        // 뒤로 가기 버튼을 누르면 기존의 그룹 화면을 보여주고 나머지를 숨깁니다.
                                        document.querySelector('.MyModal').classList.remove('on-off');
                                        handleHighlightToggle()
                                        // handleSubjectClick()
                                        data = null;
                                        console.log(data)
                                        isPause = true;
                                        speechSynthesis.resume()
                                        speechSynthesis.cancel()
                                        setColor('red')
                                    }}>뒤로 가기</button>
                            </div>

                            <div>
                                <div className='play'>
                                    <button
                                        variant='light'
                                        onClick={() => {
                                            document.querySelector('.MyModal').classList.toggle('on-off');
                                            setName(subject.name)
                                            console.log(123)
                                        }}>+</button>

                                    <button
                                        variant='info'
                                        className='b1'
                                        onClick={() => {

                                            if (play == '재생') {
                                                // 랜덤 버튼을 none으로 만들기
                                                document.querySelector('.b2').classList.add('highlighted');
                                                setPlay('중지')
                                                speechSynthesis.resume();
                                                speechSynthesis.cancel();
                                                if (pause == '재개') {
                                                    setPause('일시정지')
                                                }
                                                speakQnASequentially(subject.QnA)
                                                console.log(subject.QnA)
                                            }

                                            else {
                                                // 랜덤 버튼을 visible로 만들기
                                                document.querySelector('.b2').classList.remove('highlighted');
                                                isPause = true;
                                                speechSynthesis.resume();
                                                speechSynthesis.cancel();
                                                setColor('red')
                                                setPlay('재생')
                                                if (pause == '재개') {
                                                    setPause('일시정지')
                                                }
                                            }

                                        }}>{play}</button>

                                    <button
                                        variant='warning'
                                        className='b2'
                                        onClick={() => {

                                            if (random == '랜덤') {
                                                document.querySelector('.b1').classList.add('highlighted');
                                                setRandom('중지')
                                                speechSynthesis.resume();
                                                speechSynthesis.cancel();
                                                let aaa = [...subject.QnA]
                                                let bbb = randomize(aaa)
                                                console.log(bbb)
                                                speakQnASequentially(bbb)
                                            }

                                            else {
                                                document.querySelector('.b1').classList.remove('highlighted');
                                                setRandom('랜덤')
                                                isPause = true;
                                                speechSynthesis.resume();
                                                speechSynthesis.cancel();
                                                setColor('red')
                                                if (pause == '재개') {
                                                    setPause('일시정지')
                                                }
                                            }

                                        }
                                        }>{random}</button>
                                </div>

                                <div className='pause'>
                                    <button
                                        variant='secondary'
                                        onClick={() => {

                                            if (pause == '일시정지') {
                                                speechSynthesis.pause();
                                                setPause('재개');
                                                console.log(speechSynthesis.paused)
                                                // setColor(index/2)
                                            }

                                            else {
                                                speechSynthesis.resume();
                                                setPause('일시정지');

                                            }

                                        }}>{pause}</button>

                                    {/* <button onClick={()=>{console.log(speechSynthesis.paused)}}>test</button> */}

                                    {/* 중지 버튼 */}
                                    {/* <button onClick={() => {
                    isPause = true
                    console.log('stopping')
                  }}>중지</button> */}
                                </div>


                            </div>
                            <div>
                                {subject.QnA.map((qna, index) => (

                                    <div key={index}
                                        // className='content' 
                                        style={qna.question == color ? { backgroundColor: 'darkgray', width: '100%', height: '100%', textAlign: 'center', paddingTop: '3%', borderBottom: '1px' } : { backgroundColor: 'white', width: '100%', height: '100%', textAlign: 'center', paddingTop: '3%', borderBottom: '1px solid black' }}
                                        onClick={() => {
                                            speechSynthesis.resume();
                                            speechSynthesis.cancel();
                                            newarray = [];

                                            // console.log(qna)
                                            console.log(newarray)
                                            let eeeeee = [...newarray]
                                            let ffffff = eeeeee.splice(0, index)
                                            eeeeee.push(...ffffff)
                                            console.log(eeeeee)
                                            newarray = eeeeee

                                            let copy = [...subject.QnA]
                                            let arr1 = copy.splice(0, index)
                                            copy.push(...arr1)
                                            console.log(copy)
                                            speakQnASequentially(copy)

                                            // 전체 인덱스를 푸쉬해 
                                            // 인덱스를 만져주고
                                            // 얘를 돌리기 cArray[0] = index
                                            // 근데 이렇게하면 처음에는 빈 배열이기 때문에 에러가 뜰수 있음 일반재생할때
                                        }}>

                                        <p style={qna.question == color ? { color: 'blue' } : { color: 'black' }}>질문: {qna.question}</p>
                                        <p style={qna.question == color ? { color: 'blue' } : { color: 'black' }}>답변: {qna.answer}</p>
                                        {/* add classname ? 
                      인덱스에 해당하는 값의 클래스네임 */}

                                        <div
                                            className='mm'
                                            onClick={(e) => {
                                                const checkbox = document.querySelector('.content');
                                                //   checkbox.addEventListener('click', event.preventDefault(), false);
                                            }}
                                        >

                                            <button onClick={() => {
                                                // 이 버튼을 누르면 버튼 이름이 수정하기로 바뀌며, 
                                                // 그룹, 질문, 답이 설정됩니다.
                                                // 변경하면 해당 내용이 덮어씌워집니다.
                                                setButton('수정하기');
                                                setName(subject.name);
                                                setA(qna.question);
                                                setB(qna.answer);
                                                subject.QnA.splice();
                                                document.querySelector('.MyModal').classList.toggle('on-off')

                                                temp = qna;
                                                console.log(temp);
                                                // setDataArrState(dataArr);

                                            }}>수정</button>

                                            <button onClick={() => {
                                                // 이 버튼을 누르면 문답이 사라집니다.
                                                var result = window.confirm('삭제 하시겠습니까?');

                                                if (result) {
                                                    subject.QnA.splice(index, index + 1);

                                                    let aaaaaaaaa = [...dataArr]
                                                    localStorage.setItem('data', JSON.stringify(dataArr));
                                                    // setDataArrState(aaaaaaaaa)
                                                }

                                            }}>x</button>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
        <div className='MyModal'>

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

        </div>
        </>
    );
}

export default Group;
