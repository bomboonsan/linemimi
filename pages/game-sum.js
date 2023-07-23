import '../app/globals.scss'
import Image from 'next/image'
import LayoutFrontend from '@/components/layout/LayoutFrontend'
import StartGame from '@/components/game/StartGame'
import ResultGame from '@/components/game/ResultGame'
import ButtonGame from '@/components/game/ButtonGame'
import ChoiceGameItem from '@/components/game/ChoiceGameItem'
import ChoiceGameTitle from '@/components/game/ChoiceGameTitle'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function GameSum() {
    const [isStart , setIsStart] = useState(true);
    const [isResult , setIsResul] = useState(false);
    const [isPlaying , setIsPlaying] = useState(true);

    const [currectQuestion , setCurrectQuestion] = useState(0);    
    const [selectedPoint , setSelectedPoint] = useState(null);
    const [userPoint , setUserPoint] = useState([]);
    const [indexResult , setIndexResult] = useState(0);
    
    // const changeState = () => {
    //     setIsStart(false)
    //     setIsResul(true)
    // }

    const selectChange = (e) => {
        setSelectedPoint(e.target.value)
    }

    const nextQuestion = () => {
        if (selectedPoint == null) {
            // User no select
            Swal.fire({
                icon: 'warning',
                text: 'กรุณาเลือกคำตอบ',
                confirmButtonText: 'ตกลง',
            })
            return;
        }
        const maxQuestion = mockupData.questionLists.length;
        if (currectQuestion < maxQuestion - 1) {
            const next = currectQuestion + 1;
            setCurrectQuestion(next)

            // Set Point
            const newPoint = [...userPoint];
            newPoint[currectQuestion] = selectedPoint;
            setUserPoint(newPoint);

            // ResetPoint
            setSelectedPoint(null)

        } else {
            // Set Point
            const newPoint = [...userPoint];
            newPoint[currectQuestion] = selectedPoint;
            setUserPoint(newPoint);
            
            // ResetPoint
            setSelectedPoint(null)


            setIsPlaying(false)
            setIsResul(true)

            calcResult(newPoint)

        }
    }
    
    const calcResult = (point) => {

        const totalPoint = point.reduce((a, b) => Number(a) + Number(b), 0);

        // หา Index
        const resultIndex = findResultIndex(totalPoint)
        setIndexResult(resultIndex)

    }

    function findResultIndex(point) {
        for (let i = 0; i < mockupData.resultLists.length; i++) {
          if (mockupData.resultLists[i].resultPoint > point) {
            return i;
          }
        }
        return 0; // Return -1 if the point is not found
    }


    const mockupData = {
        'questionTitle': 'เสน่ห์ที่ซ่อนอยู่ในตัวคุณ',
        'questionLists' : [
            {
                'questionItemTitle' : '1. วันหยุดสุดเหว่ว้า คุณจะทำอะไร?',
                'choies' : [
                    {
                        'choiesName' : 'ไปเที่ยวกับแก๊งค์เพื่อน',
                        'choiesImage' : '/images/demo/gameThumbnail.png',
                        'choiesPoint' : 4
                    },
                    {
                        'choiesName' : 'โทรเมาท์มอยกะเพื่อนหรือไม่ก็แชท',
                        'choiesImage' : '/images/demo/gameThumbnail.png',
                        'choiesPoint' : 3
                    },
                    {
                        'choiesName' : 'นอนดูหนัง/ซีรี่ย์',
                        'choiesImage' : '/images/demo/gameThumbnail.png',
                        'choiesPoint' : 2
                    },
                    {
                        'choiesName' : 'นอนดูหนัง/ช็อปกระจาย',
                        'choiesImage' : '/images/demo/gameThumbnail.png',
                        'choiesPoint' : 1
                    }
                ]
            },
            {
                'questionItemTitle' : '2. คุณรอจ่ายตังค์ที่แคชเชียร์ แต่คนต่อแถวยาวมาก คุณจะทำยังไง?',
                'choies' : [
                    {
                        'choiesName' : 'ไปเที่ยวกับแก๊งค์เพื่อน',
                        'choiesImage' : '/images/demo/gameThumbnail.png',
                        'choiesPoint' : 3
                    },
                    {
                        'choiesName' : 'โทรเมาท์มอยกะเพื่อนหรือไม่ก็แชท',
                        'choiesImage' : '/images/demo/gameThumbnail.png',
                        'choiesPoint' : 2
                    },
                    {
                        'choiesName' : 'นอนดูหนัง/ซีรี่ย์',
                        'choiesImage' : '/images/demo/gameThumbnail.png',
                        'choiesPoint' : 1
                    }
                ]
            }
        ],
        'resultLists' : [
            {
                'resultPoint' : 4,
                'resultTitle' : 'เพราะ “คุณกลัวการโดนปฏิเสธ”',
                'resultImage' : '/images/demo/gameThumbnail.png',
                'resultText' : 'คุณเป็นคนที่นึกถึงความสุขของคนอื่นก่อนตนเองเสมอ และเชื่อว่าการบอกความรู้สึกของตัวเองออกไปเป็นเรื่องน่าอาย คุณจึงมักคิดว่าตัวเองไม่มีคุณค่ามากพอ หากเทียบกับคนอื่น ฉะนั้นถึงแม้คุณจะแสดงออกอย่างชัดเจนว่าอยากมีแฟน แต่ลึก ๆ ในใจของคุณนั่นก็ยังคงกลัวความผิดหวัง'
            },
            {
                'resultPoint' : 7,
                'resultTitle' : 'เพราะ“คุณยังไม่ลืมแฟนเก่า”',
                'resultImage' : '/images/demo/gameThumbnail.png',
                'resultText' : '“ยามรัก น้ำต้มผักที่ว่าขม ก็ว่าหวาน แต่พอเลิกกันไป ทำไมมีแค่ฉันที่ยังไม่ลืม” นี่คงเป็นประโยคที่เหมาะกับคนที่ได้ผลลัพธ์นี้ เมื่อรักครั้งเก่ายังคงฝังลึกในจิตใจของคุณ ก็เป็นเรื่องยากที่คุณจะเริ่มต้นใหม่กับใครสักคน'
            },
            {
                'resultPoint' : 10,
                'resultTitle' : 'เพราะ“คุณยังไม่ลืมแฟนเก่า”',
                'resultImage' : '/images/demo/gameThumbnail.png',
                'resultText' : '“ยามรัก น้ำต้มผักที่ว่าขม ก็ว่าหวาน แต่พอเลิกกันไป ทำไมมีแค่ฉันที่ยังไม่ลืม” นี่คงเป็นประโยคที่เหมาะกับคนที่ได้ผลลัพธ์นี้ เมื่อรักครั้งเก่ายังคงฝังลึกในจิตใจของคุณ ก็เป็นเรื่องยากที่คุณจะเริ่มต้นใหม่กับใครสักคน'
            }
        ]
    }

    return (
        <>
            <LayoutFrontend>
                <div className='px-3'>
                    {/* {isStart && <StartGame gameName={'ผู้ชายสไตล์ไหน คือเนื้อคู่ของคุณ'} gameThumbnail={'/images/demo/gameThumbnail.png'} />}
                    {isStart && <div onClick={changeState}><ButtonGame /></div>} */}
                    
                    {isPlaying && mockupData.questionLists.map ((item , index) => (
                        <>  
                            <div key={index}>
                            {currectQuestion == index && (

                                <>
                                <div key={index}>
                                <ChoiceGameTitle title={item.questionItemTitle} index={index} />

                                {item.choies.map ((item , index) => (
                                    <>
                                    {/* Choice Item */}
                                    <div className='choise-item' key={index}>
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <input type="radio" name={`question-${currectQuestion}`} value={item.choiesPoint} className="radio bg-white/80 checked:bg-blue-500" onChange={(e) => selectChange(e)} />
                                                <span className="label-text flex-1 pl-3">
                                                    <div className='flex flex-wrap gap-4 items-center'>
                                                        {item.choiesImage &&
                                                        <div className='basis-1/4 w-1/4'>
                                                            <img className='w-full h-auto rounded-lg' src={item.choiesImage} />
                                                        </div>
                                                        }
                                                        <div className='flex-1'>
                                                            <p className='font-semibold text-[1.1em]'>
                                                                {item.choiesName}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </span> 
                                            </label>
                                        </div>
                                    </div>
                                    </>
                                ))}
                                </div>
                                </>
                                
                            )}       
                            </div>
                        </>
                    ))}

                    {isPlaying && 
                    <span onClick={nextQuestion}>
                        <ButtonGame buttonText={'ถัดไป'} />
                    </span>
                    }

                    {isResult && <ResultGame resultTitle={mockupData.resultLists[indexResult].resultTitle} resultImage={mockupData.resultLists[indexResult].resultImage} resultText={mockupData.resultLists[indexResult].resultText} />}

                </div>
            </LayoutFrontend>
        </>
    )
}
