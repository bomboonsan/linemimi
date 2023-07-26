"use client";

import Image from 'next/image'
import Card from '../components/Card'
import Link from 'next/link'
import { useState , useEffect } from 'react'

export default function Home() {

  const [ urlBackend , setUrlBackend ] = useState('https://ktambackend.bomboonsan.com/')

  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData();
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
          <div index={index}>
            <Link href={`/${item.questionType}/${item._id}`}><Card cardThumbnail={`${urlBackend}${item.questionImage}`} cardTitle={item.questionTitle} cardView={item.views} /></Link>
          </div>
        ))}
      </div>
    </>
  )
}
