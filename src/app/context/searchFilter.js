'use client'
import { createContext, useContext, useState } from "react";

export const SearchFilterContext = createContext()
export const useSearchFilter = () => useContext(SearchFilterContext)

export const SearchFilterProvider = ({ children }) => {
    const [searchFilter, setSearchFilter] = useState({})
    const handleSearchFilter = (e) => {
        const {name, values} = e.target
        setSearchFilter(prev=>{
            return {
                ...prev,
                [name]: values
            }
        }) 
    }
    return (
        <SearchFilterContext.Provider value={{ searchFilter, handleSearchFilter }}>
            {children}
        </SearchFilterContext.Provider>
    )
}