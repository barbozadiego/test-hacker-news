import { useState, useEffect } from "react"

const useFetch = (query, page) => {

    const [news, setNews] = useState()

    useEffect(() => {
        fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`)
        .then(res => res.json())
        .then(data => {
            let items = [] 
            data.hits.forEach(n => {
                if(n.author && n.story_title && n.story_url && n.created !== null) {
                    items.push({
                        "id": n.created_at_i,
                        "author": n.author,
                        "title": n.story_title,
                        "url": n.story_url,
                        "created": n.created_at,
                        "favIcon": 'disabled-fav'
                    })
                }
            })
            setNews(items)
        })

    }, [query, page])
    

    return news
}

export default useFetch

