import Image from 'next/image'
import Link from 'next/link'
import { useState , useEffect } from 'react';

import Lottie from "lottie-react";
import lottieLoading from "../../lottie/loading.json";

import ButtonReset from './ButtonReset';
import ButtonHome from './ButtonHome';

import ReactPlayer from 'react-player'

export default function ResultGame( { resultTitle , resultImage , resultText } ) {

    const [isLoading , setIsLoading] = useState(true);
    const [isVideo , setIsVideo] = useState(false);
    const [playing, setPlaying] = useState(true);
    

    useEffect(() => {
        
        setTimeout(() => { 
            setIsLoading(false)
        }, 3000)

        const extension = resultImage.split('.').pop().toLowerCase();
        if (extension === 'mp4') {
            setIsVideo(false);
        } else {
            setIsVideo(true);
        }
        
    }, []);

    return (
    <>
        {isLoading && <div className='w-3/5 mx-auto'><Lottie animationData={lottieLoading} loop={false} /></div> }
        {!isLoading &&        
        <>
        {resultTitle &&
        <h2 className='text-center text-2xl font-bold'>
            {resultTitle}
        </h2>
        }
        {resultImage && isVideo &&
        <div className='py-4'>
            <figure className='px-3'>
                <img className='w-full h-auto rounded-md shadow-md' src={resultImage} alt={resultTitle} />
            </figure>
        </div>
        }

        {resultImage && !isVideo &&
        <div className='py-4'>
            <ReactPlayer 
            url={resultImage}  
            playing={playing} 
            // onEnded={showBtnNextVideo}
            muted={true}
            width='100%'
            height='100%'
            />
        </div>
        }

        {resultText &&
        <div>
            <p className='text-lg text-center px-3'>
                {resultText}
            </p>
        </div>
        }
        <div className='flex flex-wrap gap-5 justify-center mt-5'>
            <ButtonReset />
            <ButtonHome />
        </div>
        </>
        }

    </>
    )
}
