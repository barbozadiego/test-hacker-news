import { createContext, useState, useRef, useEffect } from "react"

import useLocalStorage from '../hooks/useLocalStorage'

const NewsContext = createContext()

const NewsProvider = ({children}) => {

    const [newsQuery, setNewsQuery] = useLocalStorage('query', 'Select your news'),
          [currentNews, setCurrentNews] = useState(),
          [favesStorage, setFavesStorage] = useLocalStorage('favesStorage', []),
          [page, setPage] = useState(0),
          [numberPages, setNumberPages] = useState(),
          newsGrid = useRef()


    useEffect(async () => {
        const query = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${newsQuery}&page=${page}`),
              news = await query.json()
        
        if(news) {
            const newsList = [] 
            news.hits.forEach(n => {
                if(n.author && n.story_title && n.story_url && n.created !== null) {
                    newsList.push({
                        "id": n.created_at_i,
                        "author": n.author,
                        "title": n.story_title,
                        "url": n.story_url,
                        "created": n.created_at
                    })
                }
            })
            // setNumberPages(currentNews.nbPages)
            // numberPages && console.log(numberPages)
            setCurrentNews(newsList)
    }
    }, [newsQuery, page])



    // useEffect(() => {
    //     const favCard = favesStorage.filter(n => n.id === currentCard)[0]
    //     setIsFaves(favesStorage.includes(favCard))
    //  }, [])
 
 
     const toggleFaves = card => {

         let allCards = Array.from(newsGrid.current.children),
             addFav = allCards.filter(n => n.id === card.id)[0],
             index = allCards.indexOf(addFav),
             removeFav = favesStorage.filter(n => n.id.toString() === card.id)[0],
             indexRemove = favesStorage.indexOf(removeFav),
             repeatedCard = favesStorage.includes(removeFav)
 
 
        //  card.classList.toggle('faves')
 
       
         if(!repeatedCard) {
            //  setIsFaves(true)
             card.classList.add('faves')
             setFavesStorage([...favesStorage, currentNews[index]])
         } else {
            //  setIsFaves(false)
             card.classList.remove('faves')
             favesStorage.splice(indexRemove, 1)
             setFavesStorage([...favesStorage])
         }
     }




    // useEffect(() => {   
    //     if(currentNews) {
    //         const currentFaves = [...favesStorage, ...currentNews.filter(n => currentNews.findIndex(el => el.favIcon !== n.favIcon) !== -1 )]
    //             if(currentFaves.every(el => el.favIcon === 'active-fav') && currentFaves) {
    //                 for(let i=0; i < currentFaves.length; i++) {
    //                     let itemsToFaves = currentNews.find(n => n.id === currentFaves[i].id),
    //                         indices = currentNews.indexOf(itemsToFaves)
  
    //                     if(itemsToFaves && favesStorage.length > 0) currentNews[indices].favIcon = 'active-fav'
    //                 }
    //             }
    //         // setCurrentNews(currentFaves)
    //   }
    // }, [currentNews, favesStorage])

    


    const data = { newsQuery, setNewsQuery, currentNews, favesStorage, setFavesStorage, toggleFaves, numberPages, setPage, newsGrid }
    return <NewsContext.Provider value={data}> 
                {children}
           </NewsContext.Provider>
}

export { NewsProvider }
export default NewsContext



// const toggleFaves = (card) => {

//     let allCards = Array.from(newsGrid.current.children),
//         addFav = allCards.filter(n => n.id === card.id)[0],
//         index = allCards.indexOf(addFav),
//         removeFav = favesStorage.filter(n => n.id.toString() === card.id)[0],
//         indexRemove = favesStorage.indexOf(removeFav),
//         repeatedCard = favesStorage.includes(removeFav)


//     card.classList.toggle('faves')

  
//     if(!repeatedCard) {
//         setFavesStorage([...favesStorage, currentNews[index]])
//     } else {
//         favesStorage.splice(indexRemove, 1)
//         setFavesStorage([...favesStorage])
//     }
// }

    // const toggleFaves = currentCard => {

    //     let allCards = Array.from(newsGrid.current.children),
    //         addFav = allCards.filter(n => n.id === currentCard.id)[0],
    //         index = allCards.indexOf(addFav),
    //         removeFav = favesStorage.filter(n => n.id.toString() === currentCard.id)[0],
    //         indexRemove = favesStorage.indexOf(removeFav),
    //         repeatedCard = favesStorage.includes(removeFav)
      
    //     if(!repeatedCard) {
    //         currentNews[index].favIcon = 'active-fav'
    //         setFavesStorage([...favesStorage, currentNews[index]])
    //     } else {
    //         currentNews[index].favIcon = 'disabled-fav'
    //         favesStorage.splice(indexRemove, 1)
    //         setFavesStorage([...favesStorage])
    //     }
    // }