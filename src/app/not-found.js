import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[50vh]'>
        <h2 className='text-7xl font-bold text-primary'>404</h2>
        <p className='text-lg'>Page not found.</p>
        <p className='text-lg'>Back to <Link href={'/'}><span className='text-primary font-bold'>Home</span></Link></p>
    </div>
  )
}

export default NotFound