import { useState, useEffect } from "react"

const useFetch = ( query, page ) => {

    const [news, setNews] = useState()
    // const [pages, setPages] = useState()

    useEffect(() => {
        fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`)
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

            setNews(allNews)
            // setPages(data.nbPages)
        })

    }, [query, page])


    return news
}

export default useFetch

