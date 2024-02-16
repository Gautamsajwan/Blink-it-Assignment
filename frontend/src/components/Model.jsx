import React from 'react'

function Model({handleYes, handleNo}) {
  return (
    <section className='backdrop-blur-sm outline h-screen w-screen top-0 left-0 z-20 fixed flex justify-center items-center'>
        <div className='bg-gray-700 flex flex-col gap-5 px-5 py-4 rounded-lg'>
            <h1 className='text-white font-bold text-3xl'>Are you sure?</h1>

            <div className='flex justify-between gap-3 mb-2'>
                <button onClick={handleYes} className='bg-green-500 w-1/2 py-2 rounded-md font-bold text-lg text-white filter brightness-90 hover:brightness-110'>Yes</button>
                <button onClick={handleNo} className='bg-red-500 w-1/2 py-2 rounded-md font-bold text-lg text-white filter brightness-90 hover:brightness-110'>No</button>
            </div>
        </div>
    </section>
  )
}

export default Model