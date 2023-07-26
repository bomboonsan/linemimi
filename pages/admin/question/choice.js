import '@/app/globals.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LayoutBackend from '@/components/layout/LayoutBackend'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function QuestionChoice() {
    const router = useRouter()

    const [ urlBackend , setUrlBackend ] = useState('https://ktambackend.bomboonsan.com/')

    const [ payload , setPayload ] = useState({
        'questionType' : 'choice',
        'questionTitle' : '',
        'questionImage' : '',
        'choices' : [
            {
                'choiceTitle' : '',
                'answerList' : [
                    {
                        'answerImage' : '',
                        'answerText' : '',
                        'answerPoint' : '0'
                    },
                    {
                        'answerImage' : '',
                        'answerText' : '',
                        'answerPoint' : '0'
                    },
                    {
                        'answerImage' : '',
                        'answerText' : '',
                        'answerPoint' : '0'
                    }
                ]                
            }
        ],
        'results' : [
            {
                'resultPoint' : '0',
                'resultTitle' : '',
                'resultImage' : '',
                'resultText' : ''
            }
        ],
        'views' : 0,
    })

    const [ listResult , setListResult ] = useState([ {
        'resultTitle' : '',
        'resultImage' : '',
        'resultText' : ''
    } ])

    const schemaChoice = {
        'choiceTitle' : '',
        'answerList' : [
            {
                'answerImage' : '',
                'answerText' : '',
                'answerPoint' : 0
            },
            {
                'answerImage' : '',
                'answerText' : '',
                'answerPoint' : 0
            },
            {
                'answerImage' : '',
                'answerText' : '',
                'answerPoint' : 0
            }
        ]                
    }

    const schemaAnwser = {
        'answerImage' : '',
        'answerText' : '',
        'answerPoint' : 0
    }

    const schemaResult = {
        'resultPoint' : '0',
        'resultTitle' : '',
        'resultImage' : '',
        'resultText' : ''
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
    const handleChoiceTitle = (e,index) => {
        const inputText = e.target.value;
        const newPayload = {...payload};
        newPayload.choices[index].choiceTitle = inputText;
        setPayload(newPayload)
    }
    const handleChoiceText = (e,index,indexAns) => {
        const inputText = e.target.value;
        const newPayload = {...payload};
        newPayload.choices[index].answerList[indexAns].answerText = inputText;
        setPayload(newPayload)
    }
    const handleChoicePoint = (e,index,indexAns) => {
        const inputText = e.target.value;
        const newPayload = {...payload};
        newPayload.choices[index].answerList[indexAns].answerPoint = inputText;
        setPayload(newPayload)
    }
    const handleResultPoint = (e,index) => {
        const inputText = e.target.value;
        const newPayload = {...payload};
        if (index > 0) {
            if (newPayload.results[index].resultPoint < newPayload.results[index-1].resultPoint || newPayload.results[index].resultPoint == newPayload.results[index-1].resultPoint) {   
                alertText('กำหนดระบุคะแนนให้มากกว่าผลลัพท์ก่อนหน้า')         
                // return;
            }
        }
        newPayload.results[index].resultPoint = inputText;
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
    const addChoice = () => {
        const newPayload = {...payload};
        newPayload.choices.push(schemaChoice);
        setPayload(newPayload)
    }

    const removeChoice = () => {
        const newPayload = {...payload};
        if (newPayload.choices.length > 1) {
            newPayload.choices.pop();
        }
        setPayload(newPayload)
    }

    const addResult = () => {
        const newPayload = {...payload};
        const lengthResult = newPayload.results.length;

        newPayload.results.push(schemaResult);       

        newPayload.results[lengthResult].resultPoint = String(Number(newPayload.results[lengthResult-1].resultPoint) + 1)

        setPayload(newPayload)
    }

    const removeResult = () => {

        const newPayload = {...payload};
        if (newPayload.results.length > 1) {
            newPayload.results.pop();
        }
        setPayload(newPayload)
    }

    const [ numberAnswers , setNumberAnswers ] = useState([])
    const selectNumberAnswers = (e,index) => {
        const inputText = e.target.value;
        const newPayload = {...payload};
        const lengthChoice = newPayload.choices[index].answerList.length;        
        const marginLength = Number(inputText) - Number(lengthChoice)

        if (marginLength == -1) {
            newPayload.choices[index].answerList.pop()
            setPayload(newPayload)
        } else if (marginLength == 1) {
            newPayload.choices[index].answerList.push(schemaAnwser)
            setPayload(newPayload)
        }
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

    // Images Choice Upload
    const handleFileUploadChoice = async (event,index,indexAns) => {

        const files = Array.from(event.target.files);
        const formData = new FormData();
        formData.append('image', files[0]);
        try {
            const response = await fetch(urlBackend+'api/upload/image', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            const responsUrl = data[0].path;

            const newPayload = {...payload};
            newPayload.choices[index].answerList[indexAns].answerImage = responsUrl;
            setPayload(newPayload)
        } catch (error) {
            console.error('Error uploading image:', error);
        }

    }

    const handleRemoveImageChoice = async (event,index,indexAns) => {
        const newPayload = {...payload};
        const oldImageUrl = newPayload.choices[index].answerList[indexAns].answerImage;
        removeImage(oldImageUrl)
        newPayload.choices[index].answerList[indexAns].answerImage = '';
        setPayload(newPayload)
    }

    // Images Choice Upload
    const handleFileUploadResult = async (event,index) => {

        const files = Array.from(event.target.files);
        const formData = new FormData();
        formData.append('image', files[0]);
        try {
            const response = await fetch(urlBackend+'api/upload/image', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            const responsUrl = data[0].path;

            const newPayload = {...payload};
            newPayload.results[index].resultImage = responsUrl;
            setPayload(newPayload)

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

    const submitQuestion = async () => {
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
                        <h1 className='page-title text-center'>รวมคะแนน</h1>
                    </div>
                    <div className='mb-5 text-center'>
                        <ul className="steps">
                            <li className="step step-primary">ตั้งค่าคำถาม</li>
                            <li className="step">ตั้งค่าคำตอบ</li>
                        </ul>
                    </div>
                    <div className='box-container mb-5'>
                        <div className='box-header'>
                            <h2>แบบทดสอบ</h2>
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
                                <span onClick={addChoice}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                    </svg>
                                </span>

                                <span onClick={removeChoice}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </span>
                            </div>
                        </div>                            

                        {payload.choices.map((item , index) => ( 
                            <>
                            <div className='box-container' key={index}>
                                <div className='box-header'>
                                    <h2>คำถามที่ {index+1}</h2>
                                </div>
                                <div className='box-content'>                                    
                                    <div className="form-control w-full mb-4">
                                        <label className="label">
                                            <span className="label-text">
                                                คำถาม
                                            </span>
                                        </label>
                                        <input type="text" placeholder="ข้อความ..." value={payload.choices[index].choiceTitle} onChange={(e) => handleChoiceTitle(e , index)} className="input input-sm input-bordered w-full" />
                                    </div>
                                    <div className="form-control w-full mb-4">
                                        <label className="label">
                                            <span className="label-text">
                                                จำนวนตัวเลือก
                                            </span>
                                        </label>
                                        <input type="number" value={item.answerList.length} onChange={(e) => selectNumberAnswers(e , index)} className="input input-sm input-bordered w-1/2" />
                                    </div>
                                    {item.answerList.map((item , indexAns) => (
                                    <section key={key}>
                                        <div className='choise-item'>
                                            <div className="form-control">
                                                <label className="label cursor-pointer">
                                                    <input type="radio" name={`question-01`} value={''} className="radio bg-white/80 checked:bg-blue-500" />
                                                    <span className="label-text flex-1 pl-3">
                                                        <div className='flex flex-wrap gap-4 items-center'>

                                                            {payload.choices[index].answerList[indexAns].answerImage && 
                                                            <>
                                                            <div className='basis-1/4 w-1/4'>
                                                                <div className="avatar indicator w-full">
                                                                    <span className="indicator-item badge badge-error" onClick={(e) => handleRemoveImageChoice(e,index,indexAns)}>เปลี่ยนรูป</span> 
                                                                    <div className='rounded'>
                                                                        <img className='w-full h-auto block rounded' src={`${urlBackend}${payload.choices[index].answerList[indexAns].answerImage}`} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </>
                                                            }

                                                            {!payload.choices[index].answerList[indexAns].answerImage && 
                                                            <div className='basis-1/4 w-1/4'>
                                                                <div className="flex items-center justify-center w-full">
                                                                    <label for={`dropzone-file-${index}-${indexAns}`} className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                                            </svg>
                                                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                                        </div>
                                                                        <input 
                                                                            onChange={(e) => handleFileUploadChoice(e,index,indexAns)}
                                                                            id={`dropzone-file-${index}-${indexAns}`}
                                                                            type="file" 
                                                                            className="hidden" 
                                                                        />
                                                                    </label>
                                                                </div> 


                                                            </div>
                                                            }

                                                            <div className='flex-1'>
                                                                <div className="form-control w-full">
                                                                    <textarea className="textarea textarea-bordered min-h-24" placeholder="ข้อความ" onChange={(e) => handleChoiceText(e,index,indexAns)}></textarea>
                                                                </div>
                                                            </div>
                                                            <div className='w-1/6'>
                                                                <div className="form-control w-full mb-4">
                                                                    <label className="label">
                                                                        <span className="label-text">
                                                                            คะแนน
                                                                        </span>
                                                                    </label>
                                                                    <input type="number" value={`${payload.choices[index].answerList[indexAns].answerPoint}`} className="input input-sm input-bordered w-full" onChange={(e) => handleChoicePoint(e,index,indexAns)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </span> 
                                                </label>
                                            </div>
                                        </div>
                                    </section>
                                    ))}
                                </div>
                            </div>
                            </>
                        ))}                        

                            <div className='text-center mt-5'>
                                <button className="btn btn-primary btn-wide rounded-3xl text-lg" onClick={submitQuestion}>บันทึก</button>
                            </div>

                    </div>

                    <div className='result-list'>
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
                            <div className='box-container' key={index}>
                                <div className='box-header'>
                                    <h2>ผลลัพท์ {index+1}</h2>
                                </div>
                                <div className='box-content'>                                    
                                    <div className='flex flex-wrap gap-4'>
                                        <div className='basis-1/2 w-1/2'>
                                            <div className="form-control w-full mb-4">
                                                <label className="label">
                                                    <span className="label-text">
                                                        คะแนนสูงสุด
                                                    </span>
                                                </label>
                                                <input type="number" placeholder="0" value={payload.results[index].resultPoint} onChange={(e) => handleResultPoint(e,index)} className="input input-sm input-bordered w-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-control w-full mb-4">
                                        <label className="label">
                                            <span className="label-text">
                                                หัวข้อ
                                            </span>
                                        </label>
                                        <input type="text" placeholder="ข้อความ..." value={payload.results[index].resultTitle} onChange={(e) => handleResultTitle(e,index)} className="input input-sm input-bordered w-full" />
                                    </div>
                                    {payload.results[index].resultImage ??
                                    <>
                                    <img className='w-full h-auto' src={`${urlBackend}${payload.results[index].resultImage}`} />
                                    </>
                                    }
                                    <div className="form-control w-full mb-4">
                                        <label className="label">
                                            <span className="label-text">
                                                ภาพผลลัพท์
                                            </span>
                                        </label>
                                        <input 
                                            onChange={(e) => handleFileUploadResult(e,index)}
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
