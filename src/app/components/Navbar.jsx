'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { FiMenu } from 'react-icons/fi'
import Search from './Search'

const Navbar = () => {
    const menu = [{
        id: 1,
        label: 'Home',
        path: '/'
    },
    {
        id: 2,
        label: 'Anime',
        children: [{
            id: '1a',
            label: 'Top Anime',
            path: '/topanime'
        },{
            id: '1b',
            label: 'Upcoming Anime',
            path: '/upcoming'
        }]
    },
    {
        id: 3,
        label: 'Manga',
        children: [{
            id: '2a',
            label: 'Top Manga',
            path: '/topmanga'
        }]
    }
    ]

    const pathname = usePathname()
    const [showMobileMenu, setMobileMenu] = useState(false)
    const handleClickMobileMenu = () => {
        setMobileMenu(prev=>!prev)
    }
    
    const [showSearch, setShowSearch] = useState(false)

    const handleClickShowSearch = () => {
        setShowSearch(prev=>!prev)
    } 

  return (
    <>
    <nav data-testid="navbar" className={`fixed z-20 w-full bg-white shadow-sm`}>
        {/* Mobile Menu View */}
        { 
        showMobileMenu &&
        <div className='fixed w-full h-full bg-black bg-opacity-60 z-10 md:hidden' onClick={()=>handleClickMobileMenu()}>
            <div className='bg-white w-full h-fit py-3 space-y-3 px-5'>
                <ul className='flex flex-col items-center justify-center gap-1'>
                    {
                        menu.map(values=>{
                            if (values.children) {
                                return (
                                    <ul key={values.id} className='flex flex-col items-center justify-center gap-1'>
                                        {
                                            values?.children?.map(childValues=>(
                                                <Link href={childValues.path} key={childValues.id}>
                                                    <li className='py-1 px-3 rounded-full hover:bg-primary hover:text-white'>{childValues.label}</li>
                                                </Link>
                                            ))
                                        }
                                    </ul>
                                )
                            } else {
                                return (
                                    <Link href={values.path} key={values.id}>
                                        <li className='py-1 px-3 rounded-full hover:bg-primary hover:text-white'>{values.label}</li>
                                    </Link>
                                )
                            }
                        })
                    }
                </ul>
                <button className='w-full p-1 border-2 border-primary rounded-full' onClick={()=>handleClickShowSearch()}>
                    <div className='px-5 py-1 flex items-center justify-center gap-5 bg-primary rounded-full text-white'>
                        <span>Search</span>
                        <FaMagnifyingGlass />
                    </div>
                </button>
            </div>
        </div>
        }
        <Link href={'https://myanimelist.net/'} target='_blank'>
        <div className='w-full py-1 bg-yellow-200 text-center hover:bg-yellow-300'>This site is unofficial. See the official site here !</div>
        </Link>
        {/* Desktop menu view */}
        <div className='max-w-7xl w-full h-20 px-5 mx-auto flex justify-between items-center md:px-0'>
            <h1 className='text-3xl font-bold '>Niph&apos;s List</h1>
            <ul className='hidden md:flex gap-5 items-center'>
                {
                    menu?.map(values=>{
                        if (values?.children) {
                            return (
                                <span key={values.id} className='group'>{values.label}
                                <ul className='absolute hidden duration-150 md:bg-white md:p-2 md:rounded-lg md:border md:border-primary group-hover:block'>
                                {
                                    values?.children?.map(child=>(
                                            <Link key={child.id} href={child.path}>
                                                <li className='py-1 px-2 duration-100 hover:rounded-lg hover:bg-primary hover:text-white'>{child.label}</li>
                                            </Link>
                                    ))
                                }
                                </ul>
                                </span>
                            )
                        } else {
                            const active = pathname === values.path ? 'border-b-2 border-tertiary font-bold' : ''
                            return (
                                <Link href={values?.path} key={values.id}>
                                    <li className={active}>
                                        {values.label}
                                    </li>
                                </Link>
                            )
                        }
                    })
                }
                <button className='p-1 border-2 border-primary rounded-full' onClick={()=>handleClickShowSearch()}>
                    <div className='px-5 py-1 flex items-center justify-center gap-5 bg-primary rounded-full text-white'>
                        <span>Search</span>
                        <FaMagnifyingGlass />
                    </div>
                </button>
            </ul>
            <button className='w-8 h-8 md:hidden' onClick={()=>handleClickMobileMenu()}>
                <FiMenu className='w-full h-full' />
            </button>
        </div>
    </nav>
    { showSearch && 
    <Search
    handleClickShowSearch={handleClickShowSearch} />}
    </>
  )
}

export default Navbar