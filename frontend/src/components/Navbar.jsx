import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import blinkitLogo from '../assets/blink-it.svg'
import Model from './Model';

function Navbar() {
  const nav = useNavigate();
  const [model, setModel] = useState(false)

  const hideModel = () => {
    setModel(false)
  }

  const logoutHandler = async() => {
    const savedCookie = document.cookie;
    const arr = savedCookie.split("=");
    document.cookie = `${arr[0]}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    nav("/login");
    hideModel()
  }

  return (
    <nav className='font-montserrat'>
      {model && <Model handleYes={logoutHandler} handleNo={hideModel}/>}
      <div className="sticky top-0 text-white w-full text-lg font-semibold font-montserrat px-7 py-3 flex justify-between items-center border-b-[5px] border-gray-800">
        <Link to='/'>
          <img className="w-24 object-cover filter contrast-125 cursor-pointer" src={blinkitLogo} alt="brandlogo" />
        </Link>

        <div className="flex items-center flex-grow justify-end">
          <ul className="flex gap-2.5 px-3 mr-3 py-1 border-r-[3px] border-gray-500">
            <li><Link to="/" className="bg-gray-600/80 text-base px-4 py-2 rounded-md hover:bg-blue-400 transition ease-in-out">Home</Link></li>
            <li><Link to="/upload" className="bg-gray-600/80 text-base px-4 py-2 rounded-md hover:bg-blue-400 transition ease-in-out">Upload</Link></li>
          </ul>

          <button onClick={() => setModel(true)} className="px-4 py-2 text-white rounded-md text-base bg-gray-600/40 hover:bg-blue-500 transition-all ease-in-out duration-200">Log out</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar