import { useState, useEffect } from "react"

const useFetch = (query) => {

    const [news, setNews] = useState()

    useEffect(() => {
        fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=0`)
        .then(res => res.json())
        .then(data => {

            let allNews = [] 
            
            data.hits.forEach(el => {
                if(el.author !== null && el.story_title !== null && el.story_url !== null && el.created !== null) {
                    allNews.push({
                        "author": el.author,
                        "title": el.story_title,
                        "url": el.story_url,
                        "created": el.created_at
                    })
                }
            })

            setNews(allNews)
        })

    }, [query])


    return news
}

export default useFetch

