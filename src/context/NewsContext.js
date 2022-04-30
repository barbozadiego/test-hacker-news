import { createContext, useState, useEffect } from "react"
import useLocalStorage from '../hooks/useLocalStorage'

const NewsContext = createContext()

const NewsProvider = ({children}) => {

    const [newsQuery, setNewsQuery] = useLocalStorage('query', 'Select your news'),
          [currentNews, setCurrentNews] = useState(),
          [favesStorage, setFavesStorage] = useLocalStorage('favesStorage', []),
          [page, setPage] = useState(0),
          [numberPages, setNumberPages] = useState(0),
          itemsPerPage = 8

    const urlAPi = "https://hn.algolia.com/api/v1/search_by_date"
        //   atributes = "author,story_title,story_url,created_at_i,created_at"

    useEffect(async () => {
        const query = await fetch(`${urlAPi}?query=${newsQuery}&hitsPerPage=${itemsPerPage}&page=${page}`),
              news = await query.json()

        if(news) {
            const newsList = [] 
            news.hits.forEach(n => {
                    newsList.push({
                        "id": n.created_at_i,
                        "author": n.author,
                        "title": n.story_title !== null ? n.story_title : 'News uploaded without information' ,
                        "url": n.story_url,
                        "created": n.created_at
                    })
            })

            setNumberPages(news.nbPages)
            setCurrentNews(newsList)
         }
    }, [newsQuery, page])
    

    const data = {itemsPerPage, newsQuery, setNewsQuery, setPage, page, currentNews, favesStorage, setFavesStorage, numberPages}

    return <NewsContext.Provider value={data}> 
                {children}
           </NewsContext.Provider>
}

export { NewsProvider }
export default NewsContext