import { useState, useRef } from 'react'
import Icon from '../Atoms/Icon'
import useLocalStorage from '../../hooks/useLocalStorage'


import '../../styles/news-card.css'

const NewsCard = ({author, title, url, created, news, id}) => {

    const favesCard = useRef()

    const [favIcon, setFavIcon] = useState('disabled-fav')

    const [localStorage, setLocalStorage] = useLocalStorage('faves', [])

    const toggleFaves = e => {
        e.stopPropagation()

        let fav = news.filter(n => n.id === id)[0]

        if(favesCard.current.className === 'card') {
            setFavIcon('active-fav')
            favesCard.current.classList.add('classActive')
        } else {
            setFavIcon('disabled-fav')
            favesCard.current.classList.remove('classActive')
        }

        setLocalStorage([...localStorage, fav])
        
        
        // if(favIcon === 'active-fav' && favesCard.current.className === 'card') setLocalStorage([...localStorage, fav])
        // setLocalStorage([...localStorage, fav])
        console.log(localStorage)
    }



    return(
        <article ref={favesCard} className="card" id={id}>
            <a href={url} rel="noopener noreferrer" target="_blank">
                <div className="news-content">
                    <span className='timer'>
                        <Icon tags='timer' />{`${created} ago by`} 
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