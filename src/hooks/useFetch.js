import { useState, useEffect } from "react"

const useFetch = (query) => {

    const [news, setNews] = useState()

    useEffect(() => {
        fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=0`)
        .then(res => res.json())
        .then(data => {

            let allNews = [] 
            
            data.hits.forEach(n => {
                if(n.author !== null && n.story_title !== null && n.story_url !== null && n.created !== null) {
                    allNews.push({
                        "id": n.created_at_i,
                        "author": n.author,
                        "title": n.story_title,
                        "url": n.story_url,
                        "created": n.created_at
                    })
                }
            })

            setNews(allNews.slice(0,8))
        })

    }, [query])


    return news
}

export default useFetch

