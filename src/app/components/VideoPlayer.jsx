'use client'
import React from 'react'
import YouTube from 'react-youtube'

const VideoPlayer = ({ videoId, handleClickShowVideoPlayer }) => {
    const options = {
        width: 1280,
        height: 720
    }
  return (
    <div className='fixed cursor-default w-full h-full flex items-center justify-center bg-black bg-opacity-60 top-0 z-50'>
        <button className='absolute w-full h-full' onClick={handleClickShowVideoPlayer}></button>
        <YouTube
         videoId={videoId}
         onReady={(e) => e.target.pauseVideo()}
         opts={options}
         className='w-full h-full'
         />
    </div>
  )
}

export default VideoPlayer