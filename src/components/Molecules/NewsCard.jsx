import { useState } from 'react'
import Icon from '../Atoms/Icon'

import '../../styles/news-card.css'

const NewsCard = ({author, title, url, created}) => {

    const [activeFav, setActiveFav] = useState(true)

    const toggleFaves = () => {
        setActiveFav(false)
    }

    return(
        <article className="card">
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
                    {
                        activeFav ? <Icon tags='favorite-1' /> : <Icon tags='favorite-2' />
                    }
                </span>
            </div>
        </article>
    )
}

export default NewsCard