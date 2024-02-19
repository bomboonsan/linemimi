import '@/app/globals.scss'
import Image from 'next/image'
import LayoutFrontend from '@/components/layout/LayoutFrontend'
import StartGame from '@/components/game/StartGame'
import ResultGame from '@/components/game/ResultGame'
import ButtonGame from '@/components/game/ButtonGame'
import { useState , useEffect } from 'react'
import { useRouter } from 'next/router';

import liff from '@line/liff';

export default function GameRandom() {
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
    
    const changeState = () => {
        setIsStart(false)
        setIsResul(true)
        const lenghtResult = data.results.length;
        const randomNumber = Math.floor(Math.random() * (Number(lenghtResult) - 1))
        setRandomIndex(randomNumber)
    }

    if(!data) {
        return (
            <>
                <LayoutFrontend>
                    <div className='min-h-[90vh] flex flex-wrap items-center justify-center'>
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
                    {isStart && <StartGame gameName={data.questionTitle} gameThumbnail={`${urlBackend}${data.questionImage}`} />}
                    {isStart && <div onClick={changeState}><ButtonGame buttonText={'ถัดไป'} /></div>}

                    {isResult && <ResultGame resultTitle={data.results[randomIndex].resultTitle} resultImage={`${urlBackend}${data.results[randomIndex].resultImage}`} resultText={data.results[randomIndex].resultText} />}
                </div>
            </LayoutFrontend>
        </>
    )
}
