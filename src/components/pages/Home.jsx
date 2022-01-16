import { useState, useEffect } from "react"

import NewsCard from "../Molecules/NewsCard"
import Header from "../Organisms/Header"

import '../../styles/home.css'


const Home = () => {

    const [news, setNews] = useState()


    useEffect(() => {
        fetch('https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=0')
        .then(res => res.json())
        .then(data => {

            let todas = [] 
            data.hits.forEach(el => {
                if(el.author !== null && el.story_title !== null && el.story_url !== null && el.created !== null) {
                    todas.push({
                        "author": el.author,
                        "title": el.story_title,
                        "url": el.story_url,
                        "created": el.created_at
                    })
                }
            })

            setNews(todas)
        })


    }, [])

    return (
        <>
         <Header />
         <section className="grid-news">
            {
                news && news.slice(0,8).map((n,i) => <NewsCard 
                                            author={n.author}
                                            title={n.title}
                                            url={n.url}
                                            created={n.created}
                                            key={i}
                                        />)
            }
         </section>
        </>
    )

}

export default Home