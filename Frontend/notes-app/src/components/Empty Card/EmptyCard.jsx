import React from 'react'

function EmptyCard({ imgSrc, message }) {
  return (
    <div className='flex flex-col items-center justify-center '>

      <div className='mt-56'>
        <img src={imgSrc} alt='No Notes' className='w-72 block m-auto' />
        <p className='flex items-center justify-center text-lg font-medium text-slate-300 text-center leading-7 mt-5'>
          {message}
        </p>
      </div>

    </div>
  )
}

export default EmptyCard
