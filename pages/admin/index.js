import '../../app/globals.scss'
import Image from 'next/image'
import LayoutBackend from '@/components/layout/LayoutBackend'
import Login from '@/components/backend/Login'

export default function AdminIndex() {

    return (
        <>
            <LayoutBackend>
                <Login />
            </LayoutBackend>
        </>
    )
}
