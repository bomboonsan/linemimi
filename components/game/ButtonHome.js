import { useRouter } from 'next/router'

export default function ButtonHome() {
    const router = useRouter()
    const handdleHome = () => {
        router.push('/')
    }
    return (
    <>
        <button className="btn btn-primary btn-sm font-normal" onClick={handdleHome}>
            ทำแบบทดสอบอื่น
        </button>
    </>
    )
}
