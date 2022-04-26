import { useRef } from 'react'

import moment from 'moment'

import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { MdOutlineWatchLater } from 'react-icons/md'

const NewsCard = ({id, created, title, author, url, favIcon, toggleFaves}) => {
    
    const currentCard = useRef()

    return (
        <article ref={currentCard} className="card" id={id}>
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
                <span onClick={ () => toggleFaves(currentCard.current)} className='favorite'>
                    {
                        favIcon !== 'disabled-fav' 
                            ? <FaHeart />
                            : <FaRegHeart />
                    }
                </span>
            </div>
        </article>
    )
} 

export default NewsCard