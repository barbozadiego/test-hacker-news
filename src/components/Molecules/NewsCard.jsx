import { useState, useEffect, useRef } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

import Icon from '../Atoms/Icon'
import moment from 'moment'

import '../../styles/news-card.css'



const NewsCard = ({author, title, url, created, id}) => {
        
    const newsCard = useRef()

    const [ago, setAgo] = useState(),
          [favIcon, setFavIcon] = useState('disabled-fav'),
          [newsStorage, setNewsStorage] = useState()

    const [favesStorage, setFavesStorage] = useLocalStorage('favesNews', [])
    

/*----------------------------------| Functions |----------------------------------*/

    const toggleFaves = e => {
        e.stopPropagation()

        let fav = newsStorage.filter(n => n.id === id)[0]

        if(newsCard.current.className === 'card') {
            setFavIcon('active-fav')
            newsCard.current.classList.add('classActive')
        } else {
            setFavIcon('disabled-fav')
            newsCard.current.classList.remove('classActive')
        }

        setFavesStorage([...favesStorage, fav])
    }

/*----------------------------------| Effects |----------------------------------*/

    useEffect(() => {
        setAgo(moment(created).fromNow())
    }, [created])


    useEffect(() => {
        const allNews = window.localStorage.getItem('allNews')
        if(allNews) setNewsStorage(JSON.parse(allNews)) 
    }, [])



    return(
        <article ref={newsCard} className="card" id={id}>
            <a href={url} rel="noopener noreferrer" target="_blank">
                <div className="news-content">
                    <span className='timer'>
                        <Icon tags='timer' />{`${ago} by`} 
                        <strong>{author}</strong>
                    </span>
                    <h2>{title}</h2>
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

export default NewsCard