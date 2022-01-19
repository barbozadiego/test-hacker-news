import { useState, useEffect } from "react"

const useFetch = ( query, page ) => {

    const [news, setNews] = useState()
    // const [pages, setPages] = useState()

    useEffect(() => {
        // fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}&hitsPerPage=35`)
        fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`)
        .then(res => res.json())
        .then(data => {

            let allNews = [] 
            
            data.hits.forEach(n => {
                if(n.author && n.story_title && n.story_url && n.created !== null) {
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
    
    // pages && console.log(pages)

    return news
}

export default useFetch

