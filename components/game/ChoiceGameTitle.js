import Image from 'next/image'
import Link from 'next/link'

export default function ChoiceGameTitle( { title } ) {
    return (
    <>
        <h2 className='text-xl font-bold'>
            {title}
        </h2>
    </>
    )
}
