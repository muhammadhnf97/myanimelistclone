import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='fixed w-full h-full bg-white top-0 z-50 flex flex-col items-center justify-center'>
        <Image src={'/images/loading.gif'} alt='loading image' width={80} height={80} />
        <p className='text-lg text-primary font-bold'>Loading</p>
    </div>
  )
}

export default Loading