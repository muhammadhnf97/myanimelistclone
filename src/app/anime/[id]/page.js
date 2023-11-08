'use client'
import VideoPlayer from '@/app/components/VideoPlayer'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa6'

const getApi = async(id) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/anime/${id}`)
  return response
}

const Page = ({ params: { id } }) => {
    const [animeDetails, setAnimeDetails] = useState([])

    useEffect(()=>{
      getApi(id)
      .then(data=>setAnimeDetails(data.data.data))
    }, [])

    const [showTrailer, setShowTrailer] = useState(false)

    const handleClickShowVideoPlayer = () => {
      setShowTrailer(prev=>!prev)
    }
    console.log(animeDetails)

  return (
    <>
    { showTrailer &&
      <VideoPlayer 
      videoId={animeDetails?.trailer?.youtube_id}
      handleClickShowVideoPlayer={handleClickShowVideoPlayer} />
    }
    <div className='max-w-7xl w-full mx-auto bg-white p-3'>
      <h2 className='text-xl font-bold text-primary'>{animeDetails?.title}</h2>
      <h3 className='font-bold text-secondary'>{animeDetails?.title_english}</h3>
      <div className='w-full flex flex-col gap-3 my-2 md:flex-row'>
        <section className='w-full space-y-3 md:w-1/5'>
          <div className='relative w-56 h-80 mx-auto border rounded-lg overflow-hidden md:w-full md:h-96'>
            <Image src={animeDetails?.images?.webp?.image_url} alt='picture name' fill className='object-center object-cover' />
          </div>
          <div>
            <h4 className='text-lg font-semibold border-b'>Alternative Title</h4>
            <p className='text-sm'><span className='font-semibold text-primary'>English:</span> {animeDetails?.title_english}</p>
            <p className='text-sm'><span className='font-semibold text-primary'>Japanese:</span> {animeDetails?.title_japanese} </p>
          </div>
          <div>
            <h4 className='text-lg font-semibold border-b'>Information</h4>
            <p className='text-sm'><span className='font-semibold text-primary'>Type:</span> {animeDetails?.type}</p>
            <p className='text-sm'><span className='font-semibold text-primary'>Episodes:</span> {animeDetails?.episodes} </p>
            <p className='text-sm'><span className='font-semibold text-primary'>Status:</span> {animeDetails?.airing ? 'Currently Airing' : 'Finished'}</p>
            <p className='text-sm'><span className='font-semibold text-primary'>Aired:</span> {animeDetails?.aired?.string} </p>
            <p className='text-sm'><span className='font-semibold text-primary'>Studios:</span> {animeDetails?.studios?.map(values=>(values.name))}</p>
            <p className='text-sm'><span className='font-semibold text-primary'>Source:</span> {animeDetails?.source}</p>
            <p className='text-sm'><span className='font-semibold text-primary'>Genre:</span> {animeDetails?.genres?.map(values=>values.name)}</p>
            <p className='text-sm'><span className='font-semibold text-primary'>Duration:</span> {animeDetails?.duration}.</p>
            <p className='text-sm'><span className='font-semibold text-primary'>Rating:</span> {animeDetails?.rating}</p>
          </div>
        </section>
        <section className='w-full space-y-5 md:w-4/5'>
          <div className='w-full bg-slate-100 border border-slate-300 flex gap-3 items-center'>
            <div className='text-center border-r px-3 py-2 rounded-lg'>
              <div className='px-2 bg-primary text-white'>
                <p className='text-sm font-semibold'>Score</p>
              </div>
              <p className='font-bold text-3xl text-primary'>{animeDetails?.score}</p>
            </div>
            <div className='flex flex-wrap w-full h-full justify-evenly items-center p-3 gap-2 text-center md:text-xl'>
              <h5><span className='font-semibold text-primary'>Ranked</span> #{animeDetails?.rank}</h5>
              <h5><span className='font-semibold text-primary'>Popularity</span> #{animeDetails?.popularity}</h5>
              <h5><span className='font-semibold text-primary'>Members</span> {animeDetails?.members}</h5>
            </div>
          </div>
          <div className='flex flex-col bg-slate-100 border border-slate-300 p-3 items-start justify-start gap-3 md:flex-row'>
            <div className='relative w-full h-60 mx-auto group md:w-96'>
              <Image src={animeDetails?.trailer?.images?.small_image_url} alt='image trailer' fill className='object-center object-cover' />
              <div className='invisible absolute w-full h-full bg-gray-400 group-hover:visible group-hover:mix-blend-multiply'></div>
              <button onClick={handleClickShowVideoPlayer}><FaPlay className='absolute text-red-500 w-16 h-16 right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 duration-150 group-hover:scale-110' /></button>
            </div>
            <div className='space-y-3 flex-1'>
              <h4 className='text-lg font-bold text-primary'>Synopsis</h4>
              <p>{animeDetails?.synopsis}</p>
            </div>
          </div>
        </section>
        <section>

        </section>
      </div>
    </div>
    </>
  )
}

export default Page