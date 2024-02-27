import React from 'react'
import { FaDiscord, FaInstagram } from 'react-icons/fa'
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({ weight: ["400"], subsets: ["latin"] })

function Footer() {
  return (
    <div className={`w-full items-center justify-around font-mono text-sm flex bg-[--brand-orange] text-black ${fredoka.className} py-8 px-8`}>
         <div className="flex-[0.6] text-2xl">
            <div className="flex flex-col md:flex-row justify-evenly">
                <div className="flex flex-row">
                    <p>@</p>
                    <p className="mr-2">
                    {
                        `${new Date().getFullYear()}`
                    }
                    </p>
                    <p>Rondevu</p>
                </div>
                <p className="mr-4">
                    <a href="/privacy" target="_blank">
                        Privacy policy
                    </a>
                </p>
                <p>
                    <a href="/tos" target="_blank">
                        Terms of service
                    </a>
                </p>
            </div>
        </div>
        <div className="flex-[0.4] flex flex-row justify-end">
          <p className="mr-6 hover:scale-[1.5] hover:transform hover:ease-in-out duration-300">
            <a href="https://discord.gg/Fqzse8Yjxh">
              <FaDiscord size={64} color="#995E0C"/>
            </a>
          </p>
          <p className="hover:scale-[1.5] hover:transform hover:ease-in-out duration-300">
            <a href="https://www.instagram.com/rondevuapp?igsh=ZW0xMWU3b3o4bGo=">
              <FaInstagram size={64} color="#995E0C"/>
            </a>
          </p>
        </div>
    </div>
  )
}

export default Footer