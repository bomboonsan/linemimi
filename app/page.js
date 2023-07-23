import Image from 'next/image'
import Card from '../components/Card'
import Link from 'next/link'

export default function Home() {
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
