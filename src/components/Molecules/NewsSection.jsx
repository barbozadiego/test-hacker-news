import { useState, useEffect, useRef } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

import NewsCard from './NewsCard'
import Loader from '../Molecules/Loader'

import '../../styles/newsCard.css'


const NewsSection = ({ currentNews, content }) => {

    const refCard = useRef()

    const [favesStorage, setFavesStorage] = useLocalStorage('favesStorage', [])
    const [newsToShow, setNewsToShow] = useState()


/*----------------------------------| Functions |----------------------------------*/

    const toggleFaves = currentCard => {

        let allCards = Array.from(refCard.current.children)

        let addFav = allCards.filter(n => n.id === currentCard.id)[0],
            index = allCards.indexOf(addFav)

        let removeFav = favesStorage.filter(n => n.id.toString() === currentCard.id)[0],
            indexRemove = favesStorage.indexOf(removeFav)

        let repeatedCard = favesStorage.includes(removeFav)
      
        if(!repeatedCard) {
            newsToShow[index].favIcon = 'active-fav'
            setFavesStorage([...favesStorage, currentNews[index]])
        } else {
            newsToShow[index].favIcon = 'disabled-fav'
            favesStorage.splice(indexRemove, 1)
            setFavesStorage([...favesStorage])
        }
        
    }


/*----------------------------------| Effects |----------------------------------*/

    useEffect(() => {

        if(currentNews) {
            const currentFaves = [...favesStorage, ...currentNews.filter(n => currentNews.findIndex(el => el.favIcon !== n.favIcon) !== -1 )]
                if(currentFaves.every(el => el.favIcon === 'active-fav') && currentFaves) {
                    for(let i=0; i < currentFaves.length; i++) {
                        let itemsToFaves = currentNews.find(n => n.id === currentFaves[i].id),
                            indices = currentNews.indexOf(itemsToFaves)

                        if(itemsToFaves && favesStorage.length > 0) currentNews[indices].favIcon = 'active-fav'
                    }
                }

             setNewsToShow(content === 'All' ? currentNews : favesStorage)
       }

    }, [content, currentNews, favesStorage, setFavesStorage])



    return (    
      <>
        {
          newsToShow && newsToShow.length > 0
            ? <div ref={refCard} className="grid-news">
                {  
                    newsToShow.map(item => 
                        <NewsCard id={item.id}
                            key={item.id}
                            title={item.title}
                            url={item.url}
                            created={item.created}
                            author={item.author}
                            toggleFaves={toggleFaves}
                            favIcon={item.favIcon}
                        />)
                    }
                </div>

            : <div>
                {   
                    content === 'All'
                        ?  <div className='box-loader'>
                                <Loader message='Getting data from server...' />  
                            </div>

                        :  <div className='no-news-yet'>
                                <h2>No news yet</h2>
                            </div>  
                }
            </div>
       }
     </>
    )
}

export default NewsSection

