'use client'
import Loading from '@/app/components/Loading'
import VideoPlayer from '@/app/components/VideoPlayer'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa6'

const getApi = async(id) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/manga/${id}`)
  return response
}

const Page = ({ params: { id } }) => {
  const [isLoading, setIsLoading] = useState(true)
    const [details, setDetails] = useState([])

    useEffect(()=>{
      getApi(id)
      .then(data=>{
        setDetails(data.data.data)
        setIsLoading(false)
      })
    }, [])

    const [showTrailer, setShowTrailer] = useState(false)

    const handleClickShowVideoPlayer = () => {
      setShowTrailer(prev=>!prev)
    }

  return (
    <>
    { showTrailer &&
      <VideoPlayer 
      videoId={details?.trailer?.youtube_id}
      handleClickShowVideoPlayer={handleClickShowVideoPlayer} />
    }
    {
      isLoading ?
      <Loading />
      :
      <div className='max-w-7xl w-full mx-auto bg-white p-3'>
        <h2 className='text-xl font-bold text-primary'>{details?.title}</h2>
        <h3 className='font-bold text-secondary'>{details?.title_english}</h3>
        <div className='w-full flex flex-col gap-3 my-2 md:flex-row'>
          <section className='w-full space-y-3 md:w-1/5'>
            <div className='relative w-56 h-80 mx-auto border rounded-lg overflow-hidden md:w-full md:h-96'>
              <Image src={details?.images?.webp?.image_url} alt='picture name' fill className='object-center object-cover' />
            </div>
            <div>
              <h4 className='text-lg font-semibold border-b'>Alternative Title</h4>
              <p className='text-sm'><span className='font-semibold text-primary'>English:</span> {details?.title_english}</p>
              <p className='text-sm'><span className='font-semibold text-primary'>Japanese:</span> {details?.title_japanese} </p>
            </div>
            <div>
              <h4 className='text-lg font-semibold border-b'>Information</h4>
              <p className='text-sm'><span className='font-semibold text-primary'>Type:</span> {details?.type || 'unknown'}</p>
              <p className='text-sm'><span className='font-semibold text-primary'>Authors:</span> {details?.authors?.map(values=>(values.name)) || 'unknown'}</p>
              <p className='text-sm'><span className='font-semibold text-primary'>Chapters:</span> {details?.chapters || 'unknown'} </p>
              <p className='text-sm'><span className='font-semibold text-primary'>Volumes:</span> {details?.volumes || 'unknown'} </p>
              <p className='text-sm'><span className='font-semibold text-primary'>Status:</span> {details?.status || 'unknown'}</p>
              <p className='text-sm'><span className='font-semibold text-primary'>Serialization:</span> {details?.serializations?.map(values=>values.name) || 'unknown'}</p>
              <p className='text-sm'><span className='font-semibold text-primary'>Genres:</span> {details?.genres?.map(values=>values.name) || 'unknown'}</p>
              <p className='text-sm'><span className='font-semibold text-primary'>Themes:</span> {details?.themes?.map(values=>values.name) || 'unknown'}.</p>
              <p className='text-sm'><span className='font-semibold text-primary'>Published:</span> {details?.published?.string || 'unknown'}</p>
            </div>
          </section>
          <section className='w-full space-y-3 md:w-4/5'>
            <div className='w-full bg-slate-100 border border-slate-300 flex gap-3 items-center'>
              <div className='text-center border-r px-3 py-2 rounded-lg'>
                <div className='px-2 bg-primary text-white'>
                  <p className='text-sm font-semibold'>Score</p>
                </div>
                <p className='font-bold text-3xl text-primary'>{details?.score}</p>
              </div>
              <div className='flex flex-wrap w-full h-full justify-evenly items-center p-3 gap-2 text-center md:text-xl'>
                <h5><span className='font-semibold text-primary'>Ranked</span> #{details?.rank}</h5>
                <h5><span className='font-semibold text-primary'>Popularity</span> #{details?.popularity}</h5>
                <h5><span className='font-semibold text-primary'>Members</span> {details?.members}</h5>
              </div>
            </div>
            <div className='flex flex-col gap-3 md:flex-row'>
              <div className='bg-slate-100 border border-slate-300 p-3 space-y-3'>
                <div className='space-y-3 flex-1'>
                  <h4 className='text-lg font-bold text-primary'>Synopsis</h4>
                  <p>{details?.synopsis}</p>
                </div>
              </div>
            </div>
          </section>
          <section>
          </section>
        </div>
      </div>
    }
    </>
  )
}

export default Page