import Image from 'next/image'
import Link from 'next/link'
import { useState , useEffect } from 'react'
import Card from './Card'


export default function Homepage() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://ktambackend.bomboonsan.com/api/question/`);
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
            <div className='min-h-[300px] flex flex-wrap items-center justify-center'>
            <span className="loading loading-bars loading-lg"></span>
            </div>
        </>
        )
    }


    return (
        <>
            <div className='list-cards'>
                <Link href="/game-random"><Card cardThumbnail={'/images/logo.png'} cardTitle={'กรุ๊ปเลือดคุณ เหมาะกับการลงทุนแบบไหนดี?'} cardView={'1234'} /></Link>
                <Link href="/game-fix"><Card cardThumbnail={'/images/logo.png'} cardTitle={'กรุ๊ปเลือดคุณ ?'} cardView={'234'} /></Link>
                <Link href="/game-sum"><Card cardThumbnail={'/images/logo.png'} cardTitle={'กรุ๊ปเลือดคุณ ?'} cardView={'234'} /></Link>
            </div>
        </>
    )
}
