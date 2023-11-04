import Image from 'next/image'
import React, { useState } from 'react'

const AnimeReviews = ({ values }) => {
    const {title, image_url, score, tags, review, username, userProfile} = values
    const tagStyle = tags === 'Recommended' ? 
        'border-green-500 text-green-500 bg-green-100' : 
        tags === 'Mixed Feelings' ? 
        'border-yellow-500 text-yellow-500 bg-yellow-100' : 'border-red-500 text-red-500 bg-red-100'

    const [moreButton, setMoreButton] = useState(false)

    const handleMoreButton = () => {
        setMoreButton(prev=>!prev)
    }
  return (
    <div className='flex h-fit items-start gap-3'>
        <div className='relative w-20 h-32'>
            <Image src={image_url} alt='image' fill className='object-center object-cover'  />
        </div>
        <div className='flex-1 h-full flex flex-col justify-between'>
            <div className='flex items-center justify-between'>
                <h4 className='text-lg font-semibold'>{title}</h4>
                <p className='text-sm text-primary'>Overal Rating : {score}</p>
            </div>
            <div className='text-sm'>
                <div className={`${tagStyle} border px-2 rounded-sm w-fit`}>
                    <p className={`font-semibold`}>{tags}</p>
                </div>
                <p>{review.length > 100 && !moreButton ? review.slice(0, 250) : review}</p>
                { !moreButton &&  <button className='text-blue-400' onClick={handleMoreButton}>... Lebih Banyak</button>}
                { moreButton &&  <button className='text-blue-400' onClick={handleMoreButton}>Lebih Sedikit</button>}
            </div>
            <div className='flex items-center text-primary text-sm gap-2'>
                <p>Write by</p>
                <div className='relative w-5 h-5 rounded-full overflow-hidden'>
                    <Image src={userProfile} alt='userImage' fill className='object-center object-cover' />
                </div>
                <p>{username}</p>
            </div>
            
        </div>
    </div>
  )
}

export default AnimeReviews