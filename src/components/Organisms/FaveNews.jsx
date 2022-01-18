import { useState, useEffect } from 'react'
import NewsCard from '../Molecules/NewsCard'

import '../../styles/section-news.css'

const SectionNews = () => {

    const [faveNews, setFaveNews] = useState()

    useEffect(() => {
        const faves = window.localStorage.getItem('faves')
        if(faves) {
            const allFav = JSON.parse(faves)
            setFaveNews(allFav) 
        }

    }, [])
    

    return (
        <>
            {
                faveNews 
                ?  <div className="grid-news">
                        {   
                            faveNews.map(n => 
                            <NewsCard 
                                id={n.id}
                                key={n.id}
                                author={n.author}
                                title={n.title}
                                url={n.url}
                                created={n.created}
                                news={faveNews}
                            />)   
                        }
                    </div>

                :   <h2>No news yet</h2>
            }
        </>
    )
}

export default SectionNews