import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import { useState , useEffect } from 'react'

export default function HeaderBackend() {
    const router = useRouter()
    const [ accessToken , setAccessToken ] = useState(null)

    useEffect(() => {
        const accessTokenState = Cookies.get('token');
        setAccessToken(accessTokenState)     
        
        // if (!accessTokenState) {
        //     router.push('/admin')
        // }
    }, []);

    const handleLogout = () => {
        Cookies.remove('token')
        router.push('/admin')
    }

    if (!accessToken) {
        return (
            <>
            </>
        )
    }
    
    return (
        <>
            <div className="navbar bg-[#0082D6]">
                <div className="flex-1">
                    <Link className="btn btn-ghost normal-case text-xl text-white" href={'/admin/question/all'}>
                        KTAM
                    </Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 text-white">
                        <li>
                            <Link href={'/admin/setting'}>ตั้งค่าเว็บไซต์</Link>
                        </li>
                        <li>
                            <details>
                                <summary>
                                    แบบทดสอบ
                                </summary>
                                <ul className="p-2 bg-base-100 text-black z-50">
                                    <li>
                                        <Link href={'/admin/question/all'}>ทั้งหมด</Link>
                                    </li>
                                    <li>
                                        <Link href={'/admin/question/add'}>เพิ่มใหม่</Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {accessToken &&
                    <p onClick={handleLogout} className="btn btn-error btn-sm">Logout</p>
                    }
                </div>
            </div>
        </> 
    )
}
