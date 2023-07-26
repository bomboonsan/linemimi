import '@/app/globals.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LayoutBackend from '@/components/layout/LayoutBackend'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';

export default function QuestionRandom() {
    const router = useRouter()

    const [ urlBackend , setUrlBackend ] = useState('https://ktambackend.bomboonsan.com/')

    const [ payload , setPayload ] = useState({
        'questionType' : 'random',
        'questionTitle' : '',
        'questionImage' : '',
        'results' : [
            {
                'resultTitle' : '',
                'resultImage' : '',
                'resultText' : ''
            }
        ],
        'views' : 0,
    })

    const schemaResult = {
        'resultTitle' : '',
        'resultImage' : '',
        'resultText' : ''
    }

    const schemaQuestion = {
        'questionType' : 'random',
        'questionTitle' : '',
        'questionImage' : '',
        'results' : [],
        'views' : 0,
    }

    //  Function SetState
    const handleQuestionTitle = (e) => {
        const inputText = e.target.value;
        const newPayload = {...payload};
        newPayload.questionTitle = inputText;
        setPayload(newPayload)
    }
    const handleQuestionImage = (url) => {
        const newPayload = {...payload};
        newPayload.questionImage = url;
        setPayload(newPayload)
    }
    const handleResultTitle = (e,index) => {
        const inputText = e.target.value;
        const newPayload = {...payload};
        newPayload.results[index].resultTitle = inputText;
        setPayload(newPayload)
    }
    const handleResultText = (e,index) => {
        const inputText = e.target.value;
        const newPayload = {...payload};
        newPayload.results[index].resultText = inputText;
        setPayload(newPayload)
    }
    const handleResultImage = (url,index) => {
        const newPayload = {...payload};
        newPayload.results[index].resultImage = url;
        setPayload(newPayload)
    }

    // Function
    const addResult = () => {        
        const newPayload = {...payload};
        newPayload.results.push(schemaResult);
        setPayload(newPayload)
    }

    const removeResult = () => {
        const newPayload = {...payload};
        if (newPayload.results.length > 1) {
            newPayload.results.pop();
        }
        setPayload(newPayload)
    }

    // Image Thumbnail
    const [urlThumbnail, setUrlThumbnail] = useState('');
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        if (urlThumbnail !== '') {
            await removeImage(urlThumbnail)
        }

        try {
            const response = await fetch(urlBackend+'api/upload/image', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            
            setUrlThumbnail(data[0].path);
            console.log('URL image:', data[0].path);
            handleQuestionImage(data[0].path)
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    // Images Answer Upload
    const [urlAnswerImages, setUrlAnswerImages] = useState([]);
    const handleFileUploadAnswer = async (event,index) => {
        const files = Array.from(event.target.files);
        const formData = new FormData();
        formData.append('image', files[0]);
        if (urlAnswerImages[index] !== undefined) {
            // ถ้ามีไฟล์ใน index นี้อยู่แล้วให้ลบออกก่อน
            await removeImage(urlAnswerImages[index])
        }
        try {
            const response = await fetch(urlBackend+'api/upload/image', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            const responsUrl = data[0].path;
            const newArr = [...urlAnswerImages]
            newArr[index] = responsUrl
            setUrlAnswerImages(newArr);

            handleResultImage(responsUrl , index); // url , index

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    const removeImage = async (url) => {
        url = url.replace('images/upload/','')
        url = url.replace('images/','')
        try {
            const response = await fetch(`${urlBackend}api/upload/image/delete/${url}`, {
            method: 'DELETE',
            })
            console.log(response)
        } catch (error) {
            console.error('Error image delete:', error);
        }    
    }

    const alertText = (text) => {
        Swal.fire({
            icon: 'warning',
            text: text,
            confirmButtonText: 'ตกลง',
        })
    }

    const alertSuccess = (text) => {
        Swal.fire({
            icon: 'success',
            text: text,
            confirmButtonText: 'ตกลง',
        })
    }

    const submitQuestion = async () => {
        // let lastResult = newGlobolEvent.results[newGlobolEvent.results.length - 1];
        if (payload.questionTitle == '') {
            alertText('กรุณาระบุชื่อแบบทดสอบ')
            return;
        }
        if (payload.questionImage == '') {
            alertText('กรุณาระบุเลือกรูปหน้าปกแบบทดสอบ')
            return;
        }
        if (payload.results[0].resultTitle == '') {
            alertText('กรุณาระบุหัวข้อผลลัพท์')
            return;
        }
        if (payload.results[0].resultImage == '') {
            alertText('กรุณาเลือกรูปผลลัพท์')
            return;
        }
        if (payload.results[0].resultText == '') {
            alertText('กรุณาระบุคำบรรยายผลลัพท์')
            return;
        }
        if (false) {
            // alert('กรุณาระบุข้อความสำหรับผลลัพท์ล่าสุด')
        } 
        else {
            try {
                const response = await fetch(`${urlBackend}api/question/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },        
                    body: JSON.stringify(payload),
                });
        
                if (response.ok) {

                    Swal.fire({
                        icon: 'success',
                        text: 'บันทึกแบบทดสอบสำเร็จ !!',
                        confirmButtonText: 'ตกลง',
                    }).then((result) => {
                        router.push('/admin/question/all')
                    });

                } else {
                    
                console.error('Request failed!');
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        }
    }

    return (
        <>
            <LayoutBackend>
                <div className='max-w-[550px] mx-auto'>        
                    <div className='mb-5'>
                        <h1 className='page-title text-center'>สุ่มผลลัพธ์</h1>
                    </div>
                    <div className='mb-5 text-center'>
                        <ul className="steps">
                            <li className="step step-primary">ตั้งค่าคำถาม</li>
                            <li className="step">ตั้งค่าคำตอบ</li>
                        </ul>
                    </div>
                    <div className='box-container mb-5'>
                        <div className='box-header'>
                            <h2>คำถาม</h2>
                        </div>
                        <div className='box-content'>
                            <div className="form-control w-full mb-4">
                                <label className="label">
                                    <span className="label-text">
                                        ชื่อแบบทดสอบ
                                    </span>
                                </label>
                                <input type="text" placeholder="ข้อความ..." value={payload.questionTitle} onChange={(e) => handleQuestionTitle(e)} className="input input-sm input-bordered w-full" />
                            </div>
                            {urlThumbnail && 
                            <>
                            <img src={`${urlBackend}${urlThumbnail}`} />
                            </>
                            }
                            <div className="form-control w-full mb-4">
                                <label className="label">
                                    <span className="label-text">
                                        ภาพหน้าปกแบบทดสอบ
                                    </span>
                                </label>
                                <input 
                                    onChange={handleFileUpload}
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered file-input-sm w-full" 
                                />
                            </div>
                            <div className='text-center mt-5'>
                                <button className="btn btn-primary btn-sm btn-wide rounded-3xl">ต่อไป</button>
                            </div>
                        </div>
                    </div>                    

                    <div className='answer-list'>
                        <div className='buttons-action-wrapper'>
                            <div className='buttons-action'>
                                <span onClick={addResult}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                    </svg>
                                </span>

                                <span onClick={removeResult}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </span>
                            </div>
                        </div>                            

                        {payload.results.map((item , index) => ( 
                            <>
                            <div className='box-container' index={index}>
                                <div className='box-header'>
                                    <h2>คำตอบ {index+1}</h2>
                                </div>
                                <div className='box-content'>
                                    <div className="form-control w-full mb-4">
                                        <label className="label">
                                            <span className="label-text">
                                                หัวข้อ
                                            </span>
                                        </label>
                                        <input type="text" placeholder="ข้อความ..." value={payload.results[index].resultTitle} onChange={(e) => handleResultTitle(e,index)} className="input input-sm input-bordered w-full" />
                                    </div>
                                    {urlAnswerImages[index] && 
                                    <>
                                    <img src={`${urlBackend}${urlAnswerImages[index]}`} />
                                    </>
                                    }
                                    <div className="form-control w-full mb-4">
                                        <label className="label">
                                            <span className="label-text">
                                                ภาพผลลัพท์
                                            </span>
                                        </label>
                                        <input 
                                            onChange={(e) => handleFileUploadAnswer(e,index)}
                                            type="file" 
                                            accept="image/*"
                                            className="file-input file-input-bordered file-input-sm w-full" 
                                        />
                                    </div>
                                    <div className="form-control w-full mb-4">
                                        <label className="label">
                                            <span className="label-text">
                                                คำบรรยาย
                                            </span>
                                        </label>
                                        <textarea className="textarea textarea-bordered w-full min-h-24" placeholder="ข้อความ..." onChange={(e) => handleResultText(e,index)}>
                                            {payload.results[index].resultText}
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            </>
                        ))}                        

                            <div className='text-center mt-5'>
                                <button className="btn btn-primary btn-wide rounded-3xl text-lg" onClick={submitQuestion}>บันทึก</button>
                            </div>

                    </div>

                </div>
            </LayoutBackend>
        </>
    )
}
