import { useRef } from 'react'

import moment from 'moment'
import Icon from '../Atoms/Icon'

const Card = ({id, created, title, author, url, favIcon, toggleFaves}) => {
    
    const currentCard = useRef()

    return (
        <article ref={currentCard} className="card" id={id}>
            <a href={url} rel="noopener noreferrer" target="_blank">
                <div className="news-content">
                    <span className='timer'>
                        <Icon tags='timer' />{`${moment(created).fromNow()} by`} 
                        <strong>{author}</strong>
                    </span>
                    <h2>{title}</h2>
                </div>
            </a>
            

            <div className="box-favorite">
                <span onClick={ () => toggleFaves(currentCard.current)} className='favorite'>
                    <Icon tags={favIcon !== 'disabled-fav' ? 'active-fav' : 'disabled-fav'} /> 
                </span>
            </div>
        </article>
    )
} 

export default Card