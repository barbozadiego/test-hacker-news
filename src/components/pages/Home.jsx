import { useState, useEffect, useContext } from 'react'
import NewsContext from '../../context/NewsContext'
import useLocalStorage from '../../hooks/useLocalStorage'

import Header from '../Molecules/Header'
import NewsSection from '../Molecules/NewsSection'

const Home = () => {

    const {newsQuery} = useContext(NewsContext),
        //   [localeNews, setLocaleNews] = useLocalStorage('news', [])
          [news, setNews] = useState()

    useEffect(async () => {
        // fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${newsQuery}&page=${page}`)
        const query = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${newsQuery}&page=0`),
              currentNews = await query.json()
        
        if(currentNews) {
            const newsList = [] 
            currentNews.hits.forEach(n => {
                if(n.author && n.story_title && n.story_url && n.created !== null) {
                    newsList.push({
                        "id": n.created_at_i,
                        "author": n.author,
                        "title": n.story_title,
                        "url": n.story_url,
                        "created": n.created_at,
                        "favIcon": 'disabled-fav'
                    })
                }
            })
            setNews(newsList)
        }
    }, [newsQuery])

    return (
        <> 
         <Header />
         {
            news && <NewsSection news={news} />
         }
        </>
    )

}

export default Home