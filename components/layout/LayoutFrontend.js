import Image from 'next/image'
import Header from './Header'

export default function LayoutFrontend({ children }) {
    return (
        <div id='wrapper'>
            <header className='w-full'>
                <Header />
            </header>
            {children}
        </div>
    )
}
