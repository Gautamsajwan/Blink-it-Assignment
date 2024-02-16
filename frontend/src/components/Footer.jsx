import React from 'react'
import blinkitLogo from '../assets/blink-it.svg'
import { BsLinkedin, BsGithub } from "react-icons/bs"
import { LuGlobe2 } from "react-icons/lu"

function Footer() {
  return (
    <section className='p-4 sm:p-7 bg-[rgb(18,18,19)] outline outline-gray-700 outline-[5px] font-montserrat h-40'>
      <article className='w-full mx-auto max-w-7xl flex justify-between items-center'>
        <div className='flex flex-col'>
          <div>
            <img className='w-32' src={blinkitLogo} alt="blinkit logo" />
            <p className='text-white font-bold text-base -ml-[2px]'>Image Uploader</p>
          </div>

          <p className='text-white text-sm mt-5 -ml-[2px]'>Designed by <a className='text-yellow-400' href="https://gautam-portfolio-flax.vercel.app/">Gautam Sajwan</a></p>
        </div>

        <ul className='flex gap-8'>
          <li>
            <a href="https://www.linkedin.com/in/gautam-sajwan-b44179217/"> <BsLinkedin className='text-gray-300 text-4xl' /> </a>
          </li>
          <li>
            <a href="https://github.com/Gautamsajwan"> <BsGithub className='text-gray-300 text-4xl' /> </a>
          </li>
          <li>
            <a href="https://gautam-portfolio-flax.vercel.app/"> <LuGlobe2 className='text-gray-300 text-4xl' /> </a>
          </li>
        </ul>
      </article>
    </section>
  )
}

export default Footer