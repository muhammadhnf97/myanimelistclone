import React from 'react'
import { SearchFilterProvider } from './searchFilter'

const Providers = ({ children }) => {
  return (
    <SearchFilterProvider>
        {children}
    </SearchFilterProvider>
  )
}

export default Providers