import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function ChoiceGameItem( { choiceName , choiceImage , choicePoint } ) {
    const [selected , setSelected] = useState(null);

    const selectChange = (e) => {
        // setSelected()
        console.log(e.target.value);
    }

    return (
    <>
        <div className='choise-item'>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <input type="radio" name="radio-10" value={'Red'} className="radio bg-white/80 checked:bg-blue-500" onChange={(e) => selectChange(e)} />
                    <span className="label-text flex-1 pl-3">
                        <div className='flex flex-wrap gap-4 items-center'>
                            <div className='basis-1/4 w-1/4'>
                                <img className='w-full h-auto rounded-lg' src='/images/demo/gameThumbnail.png' />
                            </div>
                            <div className='flex-1'>
                                <p className='font-semibold text-[1.1em]'>
                                    ไม่กล้าดูเลย
                                </p>
                            </div>
                        </div>
                    </span> 
                </label>
            </div>
        </div>

        <div className='choise-item'>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <input type="radio" name="radio-10" value={'Blue'} className="radio bg-white/80 checked:bg-blue-500" onChange={(e) => selectChange(e)} />
                    <span className="label-text flex-1 pl-3">
                        <div className='flex flex-wrap gap-4 items-center'>
                            <div className='basis-1/4 w-1/4'>
                                <img className='w-full h-auto rounded-lg' src='/images/demo/gameThumbnail.png' />
                            </div>
                            <div className='flex-1'>
                                <p className='font-semibold text-[1.1em]'>
                                    ไม่กล้าดูเลย
                                </p>
                            </div>
                        </div>
                    </span> 
                </label>
            </div>
        </div>


    </>
    )
}
