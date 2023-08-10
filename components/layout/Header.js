import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <div className='mb-3 p-3'>
        <p className='site-title'>
            <Link href="/">
              <Image
                  className='w-[100px] h-auto block mx-auto'
                  src="/images/logo-final.png"
                  alt="KTAM"
                  // layout="fill"
                  // objectFit="cover"
                  width={900}
                  height={200}
              />
            </Link>
        </p>
    </div>
  )
}
