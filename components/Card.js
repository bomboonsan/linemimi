import Image from 'next/image'
import Link from 'next/link'

export default function Card( { cardThumbnail , cardTitle , cardView , cardUrl } ) {
    return (
        <>
            <div className='card-game'>
                <div className='basis-1/3 w-1/3'>
                    <div className='card-thumbnail'>
                        <Image
                            src={cardThumbnail} 
                            alt={cardTitle} 
                            width={300}
                            height={250}
                            priority
                            // placeholder="blur"
                        />
                    </div>        
                </div>
                <div className='card-content'>
                    <p>
                        {cardTitle}
                    </p>
                    <span>
                        {cardView} <strong>view</strong>
                    </span>
                </div>
            </div>
        </>
    )
}
