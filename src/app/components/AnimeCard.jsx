import Image from 'next/image'
import React from 'react'
import { AiFillHeart, AiFillStar } from 'react-icons/ai'

const AnimeCards = ({ values }) => {
  return (
    <div className={`${values.section === 'search' ? 'bg-primary rounded-lg' : 'bg-none'} relative cursor-pointer w-full flex gap-3 p-2 duration-150 hover:bg-secondary`}>
        <div className='relative w-16 h-24'>
          <Image 
            src={values.image_url} 
            alt='image' 
            fill
            placeholder='empty' 
            className='object-cover object-center' />
        </div>
        <div className='flex-1 text-white'>
          <h4 className={`${values.section === 'search' ? 'text-lg' : ''} font-semibold`}>{values.title}</h4>
          <p className='text-sm'>{values.type} {values.rating}</p>
          { values.section === 'upcoming'  && <div className='flex gap-2 items-center'>
            <AiFillHeart />
            <p className='text-sm'> Popularity {values.popularity}</p>
          </div>}
          { values.score && <div className={` ${values.section === 'search' ? 'absolute top-20 left-4 text-xs' : ''} flex w-fit items-center text-sm gap-1 bg-black bg-opacity-70 p-1 rounded-lg`}>
              <AiFillStar className='text-yellow-300' />
              <p className='text-white'>{values.score}</p>
          </div>}
        </div> 
    </div>
  )
}

export default AnimeCards