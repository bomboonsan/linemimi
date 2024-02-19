import '@/app/globals.scss'
import Image from 'next/image'
import LayoutFrontend from '@/components/layout/LayoutFrontend'
import StartGame from '@/components/game/StartGame'
import ResultGame from '@/components/game/ResultGame'
import ButtonGame from '@/components/game/ButtonGame'
import ChoiceGameItem from '@/components/game/ChoiceGameItem'
import ChoiceGameTitle from '@/components/game/ChoiceGameTitle'
import { useState , useEffect } from 'react'
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'

import liff from '@line/liff';

export default function GameSum() {

    const router = useRouter()
    const { id } = router.query;

    const [ urlBackend , setUrlBackend ] = useState('https://ktambackend.bomboonsan.com/')
    const [ randomIndex , setRandomIndex ] = useState(0)
    const [ pageViews , setPageViews ] = useState(0)

    const [data, setData] = useState(null);
    useEffect(() => {
        if (id) {
            fetchData();            
        }
    }, [id]);

    useEffect(() => {

        const loginWithLine = async () => {
          const liffUrl = 'https://liff.line.me/1649555704-Bew7oNw5';
          const liffId = '1649555704-Bew7oNw5';
          const lineOAUrl = 'https://line.me/R/ti/p/@144cnkiy'; 
    
          await liff.init({ liffId });
          
          if (liff.isLoggedIn()) {
            const profile = await liff.getProfile();
            const userId = profile.userId;
    
            try {
              const isFriendData = await liff.getFriendship();
              const isFriend = isFriendData.friendFlag
              console.log(isFriendData)
              if (isFriend) {
                // window.location.href = liffUrl;
              } else {
                // liff.openWindow({
                //   url: lineOAUrl,
                //   // external: true,
                //   external: false,
                // });
              }
            } catch (error) {
              console.log(error);
            }
    
          } else {
            liff.login();
          }
        };
    
        loginWithLine();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/question/id/${id}`);
            const jsonData = await response.json();
            setData(jsonData);

            // Update View
            updateView(jsonData.views)

            // console.log(jsonData)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateView = async (view) => {
        setPageViews(String(Number(view)+1));
        let newView = {
            'views' : String(Number(view)+1)
        }

        try {
            const response = await fetch(`/api/question/put/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },        
                body: JSON.stringify(newView),
            });
    
            if (response.ok) {

                // console.log('Update views successful!');

            } else {
                
                console.error('Request failed!');

            }
        } catch (error) {
            console.error('Network error:', error);
        }

    }

    const [isStart , setIsStart] = useState(true);
    const [isResult , setIsResul] = useState(false);
    const [isPlaying , setIsPlaying] = useState(false);

    const [currectQuestion , setCurrectQuestion] = useState(0);    
    const [selectedPoint , setSelectedPoint] = useState(null);
    const [userPoint , setUserPoint] = useState([]);
    const [indexResult , setIndexResult] = useState(0);
    
    const changeState = () => {
        setIsStart(false)
        setIsPlaying(true)
    }

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
        const maxQuestion = data.choices.length;
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
        for (let i = 0; i < data.results.length; i++) {
          if (data.results[i].resultPoint > point) {
            return i;
          }
        }
        return 0; // Return -1 if the point is not found
    }

    if (!data) {
            return (
                <LayoutFrontend>
                    <div className='min-h-[90vh] flex flex-wrap items-center justify-center'>
                        <span className="loading loading-bars loading-lg text-white"></span>
                    </div>
                </LayoutFrontend>
            )
    }

    return (
        <>
            <LayoutFrontend>
                <div className='px-3'>
                    {isStart && <StartGame gameName={data.questionTitle} gameThumbnail={`${urlBackend}${data.questionImage}`} />}
                    {isStart && <div onClick={changeState}><ButtonGame buttonText={'ถัดไป'} /></div>}
                    
                    {isPlaying && data.choices.map ((item , index) => (
                        <>  
                            <div key={index}>
                            {currectQuestion == index && (

                                <>
                                <div key={index}>
                                <ChoiceGameTitle title={item.choiceTitle} index={index} />

                                {item.answerList.map ((item , index) => (
                                    <>
                                    {/* Choice Item */}
                                    <div className='choise-item' key={index}>
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <input type="radio" name={`question-${currectQuestion}`} value={item.answerPoint} className="radio bg-white/80 checked:bg-blue-500" onChange={(e) => selectChange(e)} />
                                                <span className="label-text flex-1 pl-3">
                                                    <div className='flex flex-wrap gap-4 items-center'>
                                                        {item.answerImage &&
                                                        <div className='basis-1/4 w-1/4'>
                                                            <img className='w-full h-auto rounded-lg' src={`${urlBackend}${item.answerImage}`} />
                                                        </div>
                                                        }
                                                        <div className='flex-1'>
                                                            <p className='font-semibold text-[1.1em]'>
                                                                {item.answerText}
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

                    {isResult && <ResultGame resultTitle={data.results[indexResult].resultTitle} resultImage={`${urlBackend}${data.results[indexResult].resultImage}`} resultText={data.results[indexResult].resultText} />}

                </div>
            </LayoutFrontend>
        </>
    )
}
