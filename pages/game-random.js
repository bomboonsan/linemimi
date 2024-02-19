import '../app/globals.scss'
import Image from 'next/image'
import LayoutFrontend from '@/components/layout/LayoutFrontend'
import StartGame from '@/components/game/StartGame'
import ResultGame from '@/components/game/ResultGame'
import ButtonGame from '@/components/game/ButtonGame'
import { useState , useEffect } from 'react'

export default function GameRandom() {
    const [isStart , setIsStart] = useState(true);
    const [isResult , setIsResul] = useState(false);
    
    const changeState = () => {
        setIsStart(false)
        setIsResul(true)
    }

    useEffect(() => {
        fetchData();
    
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

    return (
        <>
            <LayoutFrontend>
                <div className='px-3'>
                    {isStart && <StartGame gameName={'ผู้ชายสไตล์ไหน คือเนื้อคู่ของคุณ'} gameThumbnail={'/images/demo/gameThumbnail.png'} />}
                    {isStart && <div onClick={changeState}><ButtonGame buttonText={'ถัดไป'} /></div>}

                    {isResult && <ResultGame resultTitle={'เนื้อคู่ของคุณคือ'} resultImage={'/images/demo/gameThumbnail.png'} resultText={'เปิดหม้อไม่มี ไม่มีข้าวสุก หันมาเปิด กระปุก ไม่มี ไม่มีข้าวสาร มานั่งจนจ๋อ จนจ๋อขอทาน ช่างน่าสงสารเอ๊ยเวทนา'} />}
                </div>
            </LayoutFrontend>
        </>
    )
}
