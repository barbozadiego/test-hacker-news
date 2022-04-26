import { useRef } from 'react'

import NewsCard from '../Molecules/NewsCard'
import Loader from '../Molecules/Loader'
import useLocalStorage from '../../hooks/useLocalStorage'

import '../../styles/newsCard.css'


const News = ({ currentNews }) => {

    const refCard = useRef()

    const [favesStorage, setFavesStorage] = useLocalStorage('favesStorage', [])


    const toggleFaves = currentCard => {

        let allCards = Array.from(refCard.current.children)

        let addFav = allCards.filter(n => n.id === currentCard.id)[0],
            index = allCards.indexOf(addFav)

        let removeFav = favesStorage.filter(n => n.id.toString() === currentCard.id)[0],
            indexRemove = favesStorage.indexOf(removeFav)

        let repeatedCard = favesStorage.includes(removeFav)
      
        if(!repeatedCard) {
            currentNews[index].favIcon = 'active-fav'
            setFavesStorage([...favesStorage, currentNews[index]])
        } else {
            currentNews[index].favIcon = 'disabled-fav'
            favesStorage.splice(indexRemove, 1)
            setFavesStorage([...favesStorage])
        }
    }


    return (    
      <>
        {
          currentNews && currentNews.length > 0
            ? <div ref={refCard} className="grid-news">
                {  
                    currentNews.map(item => 
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

            :  <div className='box-loader'>
                 <Loader message='Getting data from server...' />  
               </div>
       }
      </>
    )
}

export default News

