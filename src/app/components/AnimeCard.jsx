import Image from 'next/image'
import React from 'react'
import { AiFillHeart, AiFillStar } from 'react-icons/ai'

const AnimeCards = ({ values }) => {
  const {title, rating, type, popularity, image_url, score, section} = values
  return (
    <div className='cursor-pointer w-full flex gap-3 border-b border-white p-2 duration-150 hover:bg-secondary'>
        <div className='relative w-16 h-24'>
          <Image src={image_url} alt='image' fill className='object-cover object-center' />
        </div>
        <div className='flex-1 text-white'>
          <h4 className='text-lg font-semibold'>{title}</h4>
          <p className='text-sm'>{type} {rating}</p>
          { section === 'upcoming'  && <div className='flex gap-2 items-center'>
            <AiFillHeart />
            <p className='text-sm'> Popularity {popularity}</p>
          </div>}
          { score && <div className='flex w-fit items-center text-sm gap-1 bg-black bg-opacity-60 p-1 rounded-lg'>
              <AiFillStar className='text-yellow-300' />
              <p className='text-white'>{score}</p>
          </div>}
        </div> 
    </div>
  )
}

export default AnimeCards