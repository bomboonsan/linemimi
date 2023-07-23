import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <div className='mb-3 p-3'>
        <p className='site-title'>
            <Link href="/">KTAM</Link>
        </p>
    </div>
  )
}
