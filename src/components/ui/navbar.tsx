'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Covered_By_Your_Grace, Dongle } from 'next/font/google';
import { usePathname } from 'next/navigation';

const CBYG = Covered_By_Your_Grace({ weight: ["400"],  subsets: ["latin"]});
const dongle = Dongle({ weight: ["400"], subsets: ["latin"] })


const TopNavbar = () => {
    
    return (
        <div className={`w-full h-20 ${ usePathname() === '/' ?  'bg-transparent' : 'bg-[--brand-orange]'} items-center ${usePathname() === '/' ? 'border-b-2' : 'border-b-0'}
        ${usePathname() === '/' ? 'text-white' : 'text-black'}`}>
            <div className='container mx-auto px-4 h-full'>
                <div className="flex h-full items-center">
                    <Link href="/">
                        <Image 
                            priority
                            width={48}
                            height={48}
                            alt="rondevulogo"
                            src='/logo.svg'
                        />
                    </Link>
                    <h1 className={`${CBYG.className} text-4xl ml-[2rem]`}>
                        Rondevu
                    </h1>
                    <div className={`${dongle.className} ml-[10rem] flex items-center h-full`}>
                        <Link href="/polls/create">
                            <h1 className={`transition ease-in-out text-3xl text-center pb-[-10] hover:${usePathname() === '/' ? 'text-[--brand-orange]' : 'text-white'} `}>
                                Poll Maker
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNavbar;