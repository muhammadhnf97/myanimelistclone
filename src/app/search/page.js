'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Home = () => {
  const searchQuery = useSearchParams().get('q')
  return (
    <div>{searchQuery}</div>
  )
}

export default Home