import '@/app/globals.scss'
import Image from 'next/image'
import Link from 'next/link'
import LayoutBackend from '@/components/layout/LayoutBackend'

export default function QuestionAdd() {

    return (
        <>
            <LayoutBackend>
                <div className='mx-auto'>                    
                    <div className='box-container'>
                        <div className='box-header'>
                            <h2>เลือกประเภทคำถาม</h2>
                        </div>
                        <div className='box-content'>
                            <div className='flex flex-wrap gap-5 justify-center'>
                                <Link href={'/admin/question/random'} className="btn btn-wide">สุ่มผลลัพธ์</Link>
                                <Link href={'/admin/question/one-to-one'} className="btn btn-wide">กำหนดผลลัพธ์</Link>
                                <Link href={'/admin/question/choice'} className="btn btn-wide">รวมคะแนน</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutBackend>
        </>
    )
}
