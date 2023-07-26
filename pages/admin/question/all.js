import '@/app/globals.scss'
import Image from 'next/image'
import LayoutBackend from '@/components/layout/LayoutBackend'
import {  useState , useEffect } from 'react'
import Swal from 'sweetalert2'

export default function QuestionAll() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/question/all`);
            const jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteByID = async (id) => {
        // const confirmed = window.confirm('Are you sure you want to delete this question?');

        let deleteConfirm = false;

        Swal.fire({
            icon: 'warning',
            text: 'คุณต้องการลบแบบทดสอบนี้ใช่หรือไม่',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ไม่',
        }).then( async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                
                try {

                    const response = await fetch(`https://ktambackend.bomboonsan.com/api/question/id/${id}`, {
                        method: 'DELETE',
                    });
              
                    if (response.ok) {
                        console.log('Question deleted successfully');
                        
                        fetchData(); // Fetch ข้อมูลใหม่
            
                    } else {
                        console.error('Failed to delete question');
                    }
        
                } catch (error) {
                    console.error('Error occurred while deleting question', error);
                }


            } else if (result.isDenied) {
                
            }
        })

    };

    if(!data) {
        return;
    }

    return (
        <>
            <LayoutBackend>
                <div className='box-container'>
                    <div className='box-header'>
                        <h2>แบบทดสอบทั้งหมด</h2>
                    </div>
                    <div className='box-content'>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>ชื่อแบบทดสอบ</th>
                                        <th>ประเภท</th>
                                        <th>จำนวนการเล่น</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {data.map((item,index) => (
                                        <tr key={index}>
                                            <th>{index+1}</th>
                                            <td>{item.questionTitle}</td>
                                            <td>{item.questionType}</td>
                                            <td>{item.views}</td>
                                            <td>
                                                <div className='flex flex-wrap gap-1 justify-end'>                                                
                                                    <div className='flex-auto'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                        </svg>
                                                    </div>
                                                    <div className='flex-auto' onClick={() => {handleDeleteByID(item._id)}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}                                   

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </LayoutBackend>
        </>
    )
}
