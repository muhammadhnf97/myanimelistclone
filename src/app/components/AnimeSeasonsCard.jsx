import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillHeartFill } from 'react-icons/bs'

const AnimeSeasonsCard = ({ values }) => {
    const {title, popularity, score, image_url, mal_id} = values
  return (
    <Link href={`/anime/${mal_id}`}>
        <div className='cursor-pointer w-48 h-[17rem] text-center mx-auto rounded-lg shadow-sm overflow-hidden flex flex-col md:w-48'>
            <div className='relative w-full h-56 group overflow-hidden'>
                <Image src={image_url} alt='' fill className='object-cover object-center group-hover:duration-150 group-hover:scale-105' />
                <div className='absolute bg-black w-full h-full bg-opacity-0 group-hover:bg-opacity-30'></div>
                <div className='absolute top-3 left-3 flex items-center gap-1 bg-black bg-opacity-60 p-1 rounded-lg'>
                    { score ? <AiFillStar className='text-yellow-300' /> : <BsFillHeartFill className='text-red-400' /> }
                    <p className='text-white'>{score || popularity}</p>
                </div>
            </div>
            <div className='w-full flex-1 bg-primary text-white py-1 px-2 flex items-center justify-center'>
                <h2 className='text-sm'>{title.length > 30 ? title.slice(0, 30) + '...' : title}</h2>
            </div>
        </div>
    </Link>
  )
}

export default AnimeSeasonsCard