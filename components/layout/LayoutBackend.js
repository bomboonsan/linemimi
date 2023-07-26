import Image from 'next/image'
import HeaderBackend from './HeaderBackend'

export default function LayoutBackend({ children }) {
    return (
        <div id='backend-wrapper'>
            <header className='w-full shadow-sm mb-4'>
                <HeaderBackend />
            </header>
            <main className='p-3'>
                {children}
            </main>
        </div>
    )
}
