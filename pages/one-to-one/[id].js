import '@/app/globals.scss'
import Image from 'next/image'
import LayoutFrontend from '@/components/layout/LayoutFrontend'
import StartGame from '@/components/game/StartGame'
import ResultGame from '@/components/game/ResultGame'
import ButtonGame from '@/components/game/ButtonGame'
import ChoiceGameTitle from '@/components/game/ChoiceGameTitle'
import { useState , useEffect } from 'react'
import { useRouter } from 'next/router';

export default function GameRandom() {
    const router = useRouter()
    const { id } = router.query;

    const [ urlBackend , setUrlBackend ] = useState('https://ktambackend.bomboonsan.com/')
    const [ randomIndex , setRandomIndex ] = useState(0)
    const [ pageViews , setPageViews ] = useState(0)
    const [selected , setSelected] = useState(0);

    const [data, setData] = useState(null);
    useEffect(() => {
        if (id) {
            fetchData();            
        }
    }, [id]);

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
    const [isPlaying , setIsPlaying] = useState(false);
    const [isResult , setIsResul] = useState(false);
    
    const changeState = () => {
        setIsStart(false)
        setIsPlaying(true)
    }

    const selectChange = (e) => {
        setSelected(e.target.value)
    }

    const handleSubmit = () => {
        setIsPlaying(false)
        setIsResul(true)
    }

    if(!data) {
        return (
            <>
                <LayoutFrontend>
                    <div className='min-h-[300px] flex flex-wrap items-center justify-center'>
                        <span className="loading loading-bars loading-lg text-white"></span>
                    </div>
                </LayoutFrontend>
            </>
        )
    }

    return (
        <>
            <LayoutFrontend>
                <div className='px-3'>
                    <p>views : {pageViews}</p>
                    
                    {isStart && data._id == '652784aa801b0a0da4fcba03' && 
                    <>
                    <h1 className='text-center text-2xl font-bold'>
                        เลือกกองทุนลดหย่อนภาษี <br/>
                        (SSF-RMF)ที่ใช่ ให้เหมาะกับสไตล์คุณ
                    </h1>
                    <div className='py-4'>
                        <figure className='px-3'>
                            <img className='w-full h-auto rounded-md shadow-md' src={`${urlBackend}${data.questionImage}`} alt={data.questionTitle} />
                        </figure>
                    </div>  
                    </>
                    }

                    {isStart && data._id !== '652784aa801b0a0da4fcba03' && <StartGame gameName={data.questionTitle} gameThumbnail={`${urlBackend}${data.questionImage}`} />}
                    {isStart && <div onClick={changeState}><ButtonGame buttonText={'ถัดไป'} /></div>}

                    {isPlaying &&
                    <>
                    {/* <ChoiceGameTitle title={data.questionTitle} /> */}
                    {data._id == '652784aa801b0a0da4fcba03' ?
                    <>
                    <h2 className='text-xl font-bold text-center'>
                        เลือกกองทุนลดหย่อนภาษี <br/>
                        (SSF-RMF)ที่ใช่ ให้เหมาะกับสไตล์คุณ
                    </h2>
                    </> 
                    : 
                    <ChoiceGameTitle title={data.questionTitle} />
                    }
                    

                    {data.results.map ((item , index) => (
                        <>
                        <div className='choise-item' key={index}>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input type="radio" name={`question`} value={index} className="radio bg-white/80 checked:bg-blue-500" onChange={(e) => selectChange(e)} />
                                    <span className="label-text flex-1 pl-3">
                                        <div className='flex flex-wrap gap-4 items-center'>
                                            {item.choiceImage &&
                                            <div className='basis-1/4 w-1/4'>
                                                <img className='w-full h-auto rounded-lg' src={`${urlBackend}${item.choiceImage}`} />
                                            </div>
                                            }
                                            <div className='flex-1'>
                                                <p className='font-semibold text-[1.1em]'>
                                                    {item.choiceTitle}
                                                </p>
                                            </div>
                                        </div>
                                    </span> 
                                </label>
                            </div>
                        </div>
                        </>
                    ))}

                    <div onClick={handleSubmit}><ButtonGame buttonText={'ส่งคำตอบ'} /></div>
                    </>
                    }

                    {isResult && <ResultGame resultTitle={data.results[selected].resultTitle} resultImage={`${urlBackend}${data.results[selected].resultImage}`} resultText={data.results[selected].resultText} />}




                </div>
            </LayoutFrontend>
        </>
    )
}
