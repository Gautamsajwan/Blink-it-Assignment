import React, { useEffect, useState } from 'react'
import { Loader } from '../components';
import RenderCards from '../components/RenderCards';
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'

function Home() {
  const [loading, setloading] = useState(false);
  const [allImages, setallImages] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getAllPosts = async() => {
      try {
        setloading(true)
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/file/allImages`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        })
        
        const result = await response.json()
        
        if(!result.success) {
          navigate('/login')
          return toast.error(result.message)
        }
  
        setallImages(result.data.reverse())
        console.log(result.data)
      } catch (err) {
        toast.error(`Internal server error: ${err.message}`)
      } finally {
        setloading(false)
      }
    }

    getAllPosts()
  },[])

  return (
    <section className="mb-7 font-montserrat max-w-7xl min-h-screen mx-auto px-4 py-3">
      <div>
        <h1 className="font-extrabold text-[36px] text-gray-100">Image Gallery</h1>
        <p className="w-fit mt-1 text-[#d4d4d4] text-sm font-medium bg-gray-700 rounded-md px-3 py-1">
          Hover over an image to see more options
        </p>
      </div>

      {/* <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div> */}

      <div className="mt-10">
        {loading ? (
          <Loader title='Loading' />
        ) : (
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
            <RenderCards data={allImages} title="no Images uploaded yet" />
          </div>
        )}
      </div>
    </section>
  )
}

export default Home