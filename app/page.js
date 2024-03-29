"use client";

import Image from 'next/image'
import Card from '../components/Card'
import Link from 'next/link'
import { useState , useEffect } from 'react'

import liff from '@line/liff';

export default function Home() {

  const [ urlBackend , setUrlBackend ] = useState('https://ktambackend.bomboonsan.com/')

  const [data, setData] = useState(null);
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

  const fetchData = async () => {
      try {
          const response = await fetch(`/api/question/all`);
          const jsonData = await response.json();
          setData(jsonData);
          console.log(jsonData)
      } catch (error) {
          console.error('Error:', error);
      }
  };

  if (!data) {
    return (
      <>
        <div className='min-h-[90vh] flex flex-wrap items-center justify-center'>
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='list-cards'>
        {/* <Link href="/game-random"><Card cardThumbnail={'/images/logo.png'} cardTitle={'กรุ๊ปเลือดคุณ เหมาะกับการลงทุนแบบไหนดี?'} cardView={'1234'} /></Link>
        <Link href="/game-fix"><Card cardThumbnail={'/images/logo.png'} cardTitle={'กรุ๊ปเลือดคุณ ?'} cardView={'234'} /></Link>
        <Link href="/game-sum"><Card cardThumbnail={'/images/logo.png'} cardTitle={'กรุ๊ปเลือดคุณ ?'} cardView={'234'} /></Link> */}
        {data.map((item,index) => (
          <div key={index}>
            {item._id == '64d3194bc0e96032b4845b02' &&
            <Link href={`/${item.questionType}/${item._id}`}><Card cardThumbnail={`${urlBackend}${item.questionImage}`} cardTitle={item.questionTitle} cardView={item.views} /></Link>
            }      
            {item._id == '64ffe2f59ee3b13043ab1a0e' &&
            <Link href={`/${item.questionType}/${item._id}`}><Card cardThumbnail={`${urlBackend}${item.questionImage}`} cardTitle={item.questionTitle} cardView={item.views} /></Link>
            }   
            {item._id == '652784aa801b0a0da4fcba03' &&
            <Link href={`/${item.questionType}/${item._id}`}><Card cardThumbnail={`${urlBackend}${item.questionImage}`} cardTitle={item.questionTitle} cardView={item.views} /></Link>
            }   
            {/* 655466dbd0b8d64176c29260 */}
            {item._id == '65546a46d0b8d64176c29275' &&
            <Link href={`/${item.questionType}/${item._id}`}><Card cardThumbnail={`${urlBackend}${item.questionImage}`} cardTitle={item.questionTitle} cardView={item.views} /></Link>
            }  
            {item._id == '65609600802793b77f5d44f7' &&
            <Link href={`/${item.questionType}/${item._id}`}><Card cardThumbnail={`${urlBackend}${item.questionImage}`} cardTitle={item.questionTitle} cardView={item.views} /></Link>
            }   
            {/* {item._id == '652784aa801b0a0da4fcba03' &&
            <Link href={`/${item.questionType}/${item._id}`}><Card cardThumbnail={`${urlBackend}${item.questionImage}`} cardTitle={item.questionTitle} cardView={item.views} /></Link>
            }     */}
            {item._id == '65681a412970521eb935b881' && 
            <Link href={`/${item.questionType}/${item._id}`}><Card cardThumbnail={`${urlBackend}${item.questionImage}`} cardTitle={item.questionTitle} cardView={item.views} /></Link>
            }   
            {item._id == '658d2a7389b49bcc180280e7' && 
            <Link href={`/${item.questionType}/${item._id}`}><Card cardThumbnail={`${urlBackend}${item.questionImage}`} cardTitle={item.questionTitle} cardView={item.views} /></Link>
            }
            {item._id == '65c1ab9ddb1f671a7006529d' && 
            <Link href={`/${item.questionType}/${item._id}`}><Card cardThumbnail={`${urlBackend}${item.questionImage}`} cardTitle={item.questionTitle} cardView={item.views} /></Link>
            }
          </div>
        ))}
      </div> 
    </>
  )
}
