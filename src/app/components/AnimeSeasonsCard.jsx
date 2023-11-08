import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const AnimeSeasonsCard = ({ values }) => {
    const {title, score, image_url, mal_id} = values
  return (
    <Link href={`/anime?id=${mal_id}`}>
        <div className='cursor-pointer w-48 mx-auto rounded-lg shadow-sm overflow-hidden md:w-48'>
            <div className='relative w-full h-56 group overflow-hidden'>
                <Image src={image_url} alt='' fill className='object-cover object-center group-hover:duration-150 group-hover:scale-105' />
                <div className='absolute bg-black w-full h-full bg-opacity-0 group-hover:bg-opacity-30'></div>
                <div className='absolute top-3 left-3 flex items-center gap-1 bg-black bg-opacity-60 p-1 rounded-lg'>
                    <AiFillStar className='text-yellow-300' />
                    <p className='text-white'>{score}</p>
                </div>
            </div>
            <div className='w-full h-full bg-primary text-white py-1 px-2'>
                <h2 className='text-sm'>{title}</h2>
            </div>
        </div>
    </Link>
  )
}

export default AnimeSeasonsCard