'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import AnimeCards from '../components/AnimeCard'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import AnimeSeasonsCard from '../components/AnimeSeasonsCard'
import Loading from '../components/Loading'

const getApi = async(page) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/top/anime?page=${page || 1}`)
    return response
}

const Page = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [topAnime, setTopAnime] = useState([])
    const [pagination, setPagination] = useState({})
    const pageNumber = useSearchParams().get('page')

    const handlePagination = (page) => {
        setTopAnime([])
        router.push(`/topanime?page=${page}`)
    }
    
      const paginationButtons = [];
      for (let i = 1; i <= pagination?.last_visible_page; i++) {
        paginationButtons.push(i);
      }
    
      const renderPaginationButtons = () => {
        return (
        <div className='flex items-center justify-center gap-3 text-xl'>
            { pagination.current_page > 1 &&
              <>
              <button className={`text-xl py-1 px-3 bg-tertiary  rounded-lg text-white hover:bg-secondary`}
              onClick={()=>handlePagination(pagination.current_page - 1)}>Before</button>      
              <button className={`text-xl p-1 text-primary hover:text-secondary`}
              onClick={()=>handlePagination(1)}>First Page ..</button>  
              <button className={` 
              text-xl p-1 text-primary hover:text-secondary`}
              onClick={()=>handlePagination(pagination.current_page - 1)}>{pagination.current_page - 1}</button>
            </>
            }
            
            <button className={`border-b-2 border-tertiary font-bold text-secondary 
            text-xl p-1 hover:text-secondary`}
            onClick={()=>handlePagination(pagination.current_page)}>{pagination.current_page}</button>
            
            { pagination.current_page < pagination.last_visible_page &&
            <>
            <button className={` 
            text-xl p-1 text-primary hover:text-secondary`}
            onClick={()=>handlePagination(pagination.current_page + 1)}>{pagination.current_page + 1}</button>
            <button className={`text-xl p-1 text-primary hover:text-secondary`}
            onClick={()=>handlePagination(pagination.last_visible_page)}>.. Last Page</button>  
            <button className={`text-xl py-1 px-3 bg-tertiary  rounded-lg text-white hover:bg-secondary`}
            onClick={()=>handlePagination(pagination.current_page + 1)}>Next</button>
            </>
            }
        </div>)
      };

    useEffect(()=>{
        getApi(pageNumber)
        .then(data=>{
            setPagination(data.data.pagination)
            setTopAnime(data.data.data.map(values=>{
            return {
              mal_id: values.mal_id,
              image_url: values.images.webp.image_url,
              rating: values.rating,
              title: values.title,
              score: values.score,
              popularity: values.popularity,
              section: 'search',
              type: values.type
            }
            }))
            setIsLoading(false)
        })
        .catch(setTopAnime([]))
    }, [pageNumber])

  return (
    <>
    {
        isLoading ? 
        <Loading />
        :
        <div className='max-w-7xl mx-auto bg-white p-3 space-y-5'>
            <h2 className='text-4xl font-bold text-primary text-center'>Top Anime</h2>
            <div className='grid grid-cols-2 gap-3 md:grid-cols-5'>
                {
                topAnime.map(values=>(
                    <Link href={`/anime/${values.mal_id}`} key={values.mal_id}>
                        <AnimeSeasonsCard
                        values={values} />
                    </Link>
                ))
                }
            </div>
            {topAnime.length > 0 && renderPaginationButtons()}
        </div>
    }
    </>
  )
}

export default Page