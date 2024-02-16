import React from 'react'

function UploadBtn({handleUpload, disableState}) {
  return (
    <div className="mt-10 relative group">
        <button
          onClick={handleUpload}
          disabled={disableState}
          className={`font-bold flex items-center gap-2 px-7 py-2 text-lg ${
            disableState? "text-gray-400" : "text-white hover:outline-blue-600 hover:bg-blue-500"
          } cursor-pointer rounded-lg bg-[rgb(19,24,32)] z-20 outline outline-[5px] outline-gray-700 transition-all ease-in-out duration-200`}
        >
          Upload
        </button>
        {/* <div className=""></div> */}
        <div
          className={`w-[20px] h-[20px] outline outline-[5px] rounded-md outline-gray-700 absolute top-1/2 -left-14 -translate-y-1/2 ${
            !disableState &&
            "group-hover:outline-yellow-400"
          } transition-all duration-300 ease-in-out`}
        ></div>
        <div
          className={`w-[20px] h-[20px] outline outline-[5px] rounded-md outline-gray-700 absolute top-1/2 -right-14 -translate-y-1/2 ${
            !disableState &&
            "group-hover:outline-green-600"
          } transition-all duration-300 ease-in-out`}
        ></div>
    </div>
  )
}

export default UploadBtn