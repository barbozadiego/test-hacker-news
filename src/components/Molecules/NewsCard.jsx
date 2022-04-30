import { useRef } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { MdOutlineWatchLater } from 'react-icons/md'
import moment from 'moment'

import '../../styles/newsCard.css'


const NewsCard = ({id, created, title, author, url, isFaves, toggleFaves}) => {
    
    const card = useRef()
         
    return (
        <article ref={card} className="card" id={id}>
            <a href={url} rel="noopener noreferrer" target="_blank">
                <div className="news-content">
                    <span className='timer'>
                        <MdOutlineWatchLater />
                        {`${moment(created).fromNow()} by`} 
                        <strong>{author}</strong>
                    </span>
                    <h2>{title}</h2>
                </div>
            </a>

            <div className="box-favorite">
                <span onClick={() => toggleFaves(card.current)} className='favorite'>
                   { isFaves ? <FaHeart /> : <FaRegHeart /> }
                </span>
            </div>
        </article>
    )
} 

export default NewsCard