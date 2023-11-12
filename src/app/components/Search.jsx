import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useDebounce } from 'use-debounce'
import { RxCross1 } from 'react-icons/rx'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { TbMoodEmpty } from 'react-icons/tb'
import Link from 'next/link'

const getAnimeSearch = async(query, type) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${type}?q=${query}&&limit=5`)
    return response
  }

const Search = ({ handleClickShowSearch }) => {
    const router = useRouter()
    const [searchFor, setSearchFor] = useState('anime')
    const handleClickSearch = (opt) => {
        setSearchFor(opt)
    }

    const [searchEntry, setSearchEntry] = useState('')
    const handleChangeSearch = (e) => {
        setSearchEntry(e.target.value)
    }

    const [searchDebounce] = useDebounce( searchEntry, 1000)

    const handleSubmit = e => {
        e.preventDefault()
        handleClickShowSearch()
        const newRoute = `/search?type=${searchFor}&q=${searchEntry}&page=1`
        router.push(newRoute)
    }
    
    const [searchList, setSearchList] = useState([])
    useEffect(()=>{
        if (searchEntry.length > 0) {
            getAnimeSearch(searchDebounce, searchFor)
            .then(data=>{
                setSearchList(()=>{
                    return data.data.data.map(values=>{
                        return {
                            mal_id: values?.mal_id,
                            title: values?.title,
                            type: values?.type,
                            rating: values?.rating,
                            score: values?.score,
                            synopsis: values?.synopsis,
                            image_url: values?.images?.webp?.image_url
                        }
                    })
                })
            })
            .then(setSearchList([]))
        }
    }, [searchDebounce, searchFor])

  return (
    <div className='fixed top-0 w-full h-full bg-black flex items-start pt-10 justify-center bg-opacity-60 z-20'>
        <div className='w-full bg-white rounded-lg p-3 space-y-3 md:w-[40rem]'>
            <div className='w-full flex items-center justify-between text-sm'>
                <div className='flex items-center justify-center gap-1'>
                    <button 
                        className={`${searchFor === 'anime' ? 'bg-blue-100' : ''} 
                            p-1 border rounded-lg border-primary text-primary cursor-pointer`}
                        onClick={()=>handleClickSearch('anime')}>Anime</button>
                    <button 
                        className={`${searchFor === 'manga' ? 'bg-blue-100' : ''} 
                            p-1 border rounded-lg border-primary text-primary cursor-pointer`}
                        onClick={()=>handleClickSearch('manga')}>Manga</button>
                </div>
                <button onClick={handleClickShowSearch}><RxCross1 /></button>
            </div>
            <form onSubmit={e=>handleSubmit(e)}>
                <div className='flex justify-between items-center gap-3'>
                    <input type='text' name='' 
                        value={searchEntry} 
                        placeholder={`Search for ${searchFor}`} 
                        className='w-full h-10 px-2 border-b outline-none'
                        onChange={e=>handleChangeSearch(e)}
                        autoFocus />
                    <button className='p-2 bg-primary text-white rounded-lg duration-150 hover:bg-secondary'>
                        <FaMagnifyingGlass />
                    </button>
                </div>
            </form>
            <div className='w-full max-h-[40rem] overflow-auto'>
                {
                    searchList?.map(values=>(
                        <Link href={`/${searchFor}/${values.mal_id}`} key={values?.mal_id} onClick={handleClickShowSearch}>
                            <div className='flex justify-start items-start gap-3 p-3 duration-150 cursor-pointer hover:rounded-lg hover:bg-secondary hover:text-white group'>
                                <div className='relative w-16 h-24'>
                                    <Image src={values?.image_url} alt='' fill className='object-cover object-center' loading='lazy' />
                                </div>
                                <div className='relative flex-1 text-sm'>
                                    <h4 className='text-base text-tertiary font-semibold group-hover:text-blue-300'>{values?.title}</h4>
                                    <p className='text-slate-500'>{values?.type} {values?.rating}</p>
                                    <div className='absolute top-0 right-0 w-fit flex items-center gap-1 bg-black bg-opacity-60 p-1 rounded-lg'>
                                        <AiFillStar className='text-yellow-300' />
                                        <p className='text-white'>{values?.score}</p>
                                    </div>
                                    <p>{values?.synopsis?.length > 150 ? values?.synopsis?.slice(0, 150) + "..." : values?.synopsis}</p>
                                    {values?.synopsis?.length > 150 && <p className='text-blue-400'>{"Lihat lebih banyak"}</p>}
                                </div>
                            </div>
                        </Link>
                    ))
                }
                { searchList.length < 1 && 
                <div className='flex flex-col items-center justify-center text-tertiary p-3 rounded-lg border'>
                    <TbMoodEmpty className='w-10 h-10' />
                    <p className='text-lg'>
                        {searchFor.toLocaleUpperCase().slice(0,1)+searchFor.slice(1)} tidak ditemukan
                    </p>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default Search