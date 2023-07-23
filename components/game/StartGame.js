import Image from 'next/image'
import Link from 'next/link'

export default function StartGame( { gameName , gameThumbnail } ) {
  return (
    <>
        <h1 className='text-center text-2xl font-bold'>
            {gameName}
        </h1>
        <div className='py-4'>
            <figure className='px-3'>
                <img className='w-full h-auto rounded-md shadow-md' src={gameThumbnail} alt={gameName} />
            </figure>
        </div>        
    </>
  )
}
