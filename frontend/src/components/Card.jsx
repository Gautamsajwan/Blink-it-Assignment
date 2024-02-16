import { MdOutlineFileDownload } from "react-icons/md"
import { downloadImage } from '../utils'
import { toast } from "react-toastify"

function Card({_id, fileName, fileSize, imageURL}) {
    let size = Math.ceil(fileSize/1024)
    let capitalizedName = fileName[0].toUpperCase() + fileName.slice(1)
  const handleDownload = () => {
    downloadImage(_id, imageURL)
    toast.info('Image downloaded successfully')
  }
  return (
    <div className='group relative rounded-xl shadow-card hover:shadow-cardhover overflow-hidden card'>
      <img className='w-full h-full aspect-[4/3] object-cover' src={imageURL} alt="Blinkit images" />
        
      <div className='invisible opacity-0 group-hover:visible group-hover:opacity-100 flex flex-col justify-between items-center max-h-[70%] absolute bottom-0 left-0 right-0 rounded-lg bg-[#10131f]/85 mx-2 my-[6px] p-2 transition-all ease-in-out duration-300'>
        <p className='ml-2 w-full text-white text-sm font-semibold'>{capitalizedName}</p>

        <div className='mt-3 w-full flex justify-between items-center gap-2'>
            <p className='ml-1 mt-3 text-gray-100 text-sm font-semibold'>{size} KB</p>
            <button type='button' onClick={handleDownload}><MdOutlineFileDownload className='downloadBtn'/></button>
        </div>
      </div>
    </div>
  )
}

export default Card