import { useState, useEffect } from 'react'
import NewsCard from '../Molecules/NewsCard'

const FaveNews = () => {

    const [faveNews, setFaveNews] = useState()

    useEffect(() => {
        const faves = window.localStorage.getItem('favesNews')
        if(faves) setFaveNews(JSON.parse(faves)) 
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
                                className={n.className}
                                key={n.id}
                                author={n.author}
                                title={n.title}
                                url={n.url}
                                created={n.created}
                                news={faveNews}
                            />)   
                        }
                    </div>

                :   <div className='no-news-yet'>
                        <h2>No news yet</h2>
                    </div>  
            }
        </>
    )
}

export default FaveNews