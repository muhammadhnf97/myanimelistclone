'use client'
import axios from 'axios'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AnimeCards from '../components/AnimeCard'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import Link from 'next/link'

const listOfAnimeByType = [{
  id: 1,
  label: 'Anime TV',
  type: 'TV'
},{
  id: 2,
  label: 'Anime Movie',
  type: 'Movie'
},{
  id: 3,
  label: 'Anime OVA',
  type: 'OVA'
},{
  id: 4,
  label: 'Anime Special',
  type: 'Special'
},{
  id: 5,
  label: 'Anime ONA',
  type: 'ONA'
},{
  id: 6,
  label: 'Anime Music',
  type: 'Music'
},{
  id: 7,
  label: 'Manga',
  type: 'Manga'
},{
  id: 8,
  label: 'Novel',
  type: 'Novel'
},{
  id: 9,
  label: 'Light Novel',
  type: 'Lightnovel'
},{
  id: 10,
  label: 'Oneshot',
  type: 'oneshot'
},{
  id: 11,
  label: 'Doujin',
  type: 'doujin'
},{
  id: 12,
  label: 'Manhwa',
  type: 'Manhwa'
},{
  id: 13,
  label: 'Manhua',
  type: 'manhua'
}]

const getApi = async(type, query, currentPage) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${type}?q=${query}&page=${currentPage || 1}`)
  return response
}

const Home = () => {
  const router = useRouter()
  const typeQuery = useSearchParams().get('type') || 'anime'
  const searchQuery= useSearchParams().get('q') || ''
  const pageNumber = useSearchParams().get('page') || 1

  const [listOfAnime, setListOfAnime] = useState([])
  const [pagination, setPagination] = useState({})
    
  useEffect(()=>{
      getApi(typeQuery, searchQuery, pageNumber)
      .then(data=>{
        setPagination(data.data.pagination)
        setListOfAnime(()=>{
          return data.data.data.map(values=>{
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
          })
        })
      })
  }, [pageNumber, typeQuery, searchQuery])
  
  const [query, setQuery] = useState(searchQuery)
  const handleChangeQuery = (e) => {
    setQuery(e.target.value)
  }

  const [typeSearch, setTypeSearch] = useState(typeQuery)
  const handleClickTypeQuery = (type = null) => {
    setTypeSearch(prev => type ? type : prev)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setListOfAnime([])
    router.push(`/search?type=${typeSearch}&q=${query}`)
  }

  const handlePagination = (page) => {
    setListOfAnime([])
    router.push(`/search?type=${typeQuery}&q=${searchQuery}&page=${page}`)
  }

  const paginationButtons = [];
  for (let i = 1; i <= pagination.last_visible_page; i++) {
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

  return (
    <div className='max-w-7xl w-full mx-auto bg-white p-3 space-y-3'>
      <div className='p-5'>
          <h3 className='text-center font-bold text-xl'>What do you looking for ?</h3>
          <div className='w-full flex items-center justify-center gap-3 text-sm'> 
              <div className='flex items-center justify-center gap-1'>
                  <button 
                      className={`${typeSearch === 'anime' ? 'bg-blue-100' : ''} 
                          p-1 border rounded-lg border-primary text-primary cursor-pointer`}
                      onClick={()=>handleClickTypeQuery('anime')}>Anime</button>
                  <button 
                      className={`${typeSearch === 'manga' ? 'bg-blue-100' : ''} 
                          p-1 border rounded-lg border-primary text-primary cursor-pointer`}
                      onClick={()=>handleClickTypeQuery('manga')}>Manga</button>
              </div>
              <form onSubmit={e=>handleSubmit(e)}>
                <div className='w-full flex gap-3 items-center justify-center'>
                  <input type='text' name='searchQuery' 
                    value={query} placeholder='Keyword' 
                    className='w-full h-10 px-2 border-b outline-none focus:border-primary md:w-[30rem]' 
                    autoFocus 
                    onChange={e=>handleChangeQuery(e)} />
                  <button 
                    className='p-2 bg-primary text-white rounded-lg duration-150 hover:bg-secondary'>
                      <FaMagnifyingGlass />
                  </button>
                </div>
              </form>
          </div>
      </div>
      {
        listOfAnimeByType.map((data)=>{
          if (listOfAnime.filter(values=>values.type === data.type).length < 1) {
            return null
          } else {
            return (
            <div key={data.id}>
              <h3 className='text-xl font-semibold'>{data.label}</h3>
              <div className='grid grid-cols-1 gap-1 md:gap-3 md:grid-cols-4'>
                {
                  listOfAnime.filter(values=>values.type === data.type).map((values, index)=>(
                    <Link href={`/${typeQuery}/${values.mal_id}`} key={values.mal_id + index.toString()}>
                      <AnimeCards
                      values={values} />
                    </Link>
                  ))
                }
              </div>
            </div>
          )}
      })
      }
      {listOfAnime.length > 0 && renderPaginationButtons()}
    </div>
  )
}

export default Home