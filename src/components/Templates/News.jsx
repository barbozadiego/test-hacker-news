import { useState, useEffect, useRef } from 'react'
import Loader from '../Molecules/Loader'
import Icon from '../Atoms/Icon'

import '../../styles/section-news.css'
import '../../styles/news-card.css'

const SectionNews = ({ news }) => {

    const favesCard = useRef()

    const [favIcon, setFavIcon] = useState('disabled-fav')

    const [currentFav, setCurrentFav] = useState( () => {
        window.localStorage.setItem('faves', [])
    })

    // const setLocalStorage = value => {
    //     window.localStorage.setItem('faves', [])
    // }

    const toggleFaves = e => {
        e.stopPropagation()
        favesCard.current.classList.toggle('classActive')

        let fav = news.filter(n => n.id === favesCard.current.id)[0]
            fav = JSON.stringify(fav)
      

        if(favesCard.current.className === 'card classActive') {
            setFavIcon('active-fav')
            
            setCurrentFav(currentFav.push(fav))
        } else {
            setFavIcon('disabled-fav')
        }
    }
    

    const [faveNews, setFaveNews] = useState()

    useEffect(() => {
        const faves = window.localStorage.getItem('faves')
        if(faves) {
            const allFav = JSON.parse(faves)
            setFaveNews(allFav) 
        }

    }, [])

    return (
        <>
            {
                news 
                ?  <div className="grid-news">
                        {   
                            news.map(n => 
                            <article ref={favesCard} className="card" id={n.id}>
                                <a href={n.url} rel="noopener noreferrer" target="_blank">
                                    <div className="news-content">
                                        <span className='timer'>
                                            <Icon tags='timer' />{`${n.created} ago by`} 
                                            <strong>{n.author}</strong>
                                        </span>
                                        <h2>{n.title}</h2>
                                    </div>
                                </a>
                    
                                <div className="box-favorite">
                                    <span onClick={toggleFaves} className='favorite'>
                                        <Icon tags={favIcon} /> 
                                    </span>
                                </div>
                            </article> 
                           ) 
                        }
                    </div>

                :   <div className='box-loader'>
                        <Loader message='Getting data from server...' />  
                    </div>
            }
        </>
    )
}

export default SectionNews