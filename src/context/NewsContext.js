import { createContext, useState } from "react"

import useLocalStorage from '../hooks/useLocalStorage'

const NewsContext = createContext()

const NewsProvider = ({children}) => {

    const [newsQuery, setNewsQuery] = useLocalStorage('query', 'Select your news')


    const data = { newsQuery, setNewsQuery }

    return <NewsContext.Provider value={data}> 
                {children}
           </NewsContext.Provider>
}

export { NewsProvider }
export default NewsContext