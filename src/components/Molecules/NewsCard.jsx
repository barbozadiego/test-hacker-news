import { useState, useEffect, useRef } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

import Icon from '../Atoms/Icon'
import moment from 'moment'

import '../../styles/news-card.css'


const NewsCard = ({author, title, url, created, news, id, className}) => {
        
    const newsCard = useRef()

    const [ago, setAgo] = useState(),
          [favIcon, setFavIcon] = useState('disabled-fav')

    const [favesStorage, setFavesStorage] = useLocalStorage('favesNews', [])



/*----------------------------------| Functionalities |----------------------------------*/

    const toggleFaves = e => {
        e.stopPropagation()
        // setFavesStorage([...favesStorage, currentFave])


        let currentFave = news.filter(n => n.id === id)[0]
        let repeateList = news.filter(n => n.className === 'card-active')

        // currentFave.className = 'card-active'
        

        // let isRepeat
        // if(repeateList.length > 0) isRepeat = repeateList.filter(n => n.id === currentFave.id)[0]
        // else return false
        // if(isRepeat) currentFave.className = 'card-disabled'
        
        
        console.log(currentFave)

        
    }



    // const toggleFaves = e => {
    //     e.stopPropagation()
    //     let currentFave = news.filter(n => n.id === id)[0]

    //     // let currentFave2 = newsCard.current
        
    //     if(newsCard.current.className === 'card') setFavIcon('active-fav')
    //     else setFavIcon('disabled-fav')


    //     let current = document.getElementById(currentFave.id)
    //         if(current) {
    //             // current.classList === 'card' 
    //             if(current.id === id.toString()) console.log(current)

    //                current.classList.add('cardFave')
    //             //   : current.classList.remove('cardFave')
    //         }

    //     console.log(current)
    // }



    // const toggleFaves = e => {
    //     e.stopPropagation()

    //     let currentFave = news.filter(n => n.id === id)[0]
    //     let repeateList = news.filter(n => n.className === 'card-active')

    //     currentFave.className = 'card-active'
        

    //     let isRepeat

    //     if(repeateList.length > 0) isRepeat = repeateList.filter(n => n.id === currentFave.id)[0]
    //     else return false

    //     if(isRepeat) currentFave.className = 'card-disabled'
        
    //     // if(currentFave.className === 'card-disabled') currentFave.className = 'card-active'
        
    //     // setFavesStorage([...favesStorage, currentFave])

        
    //     console.log(currentFave)
    //     // console.log(isRepeat)
    // }

/*----------------------------------| Effects |----------------------------------*/

    useEffect(() => {
        setAgo(moment(created).fromNow())
    }, [created])


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
                    <Icon tags={className !== 'card-disabled' ? 'active-fav' : 'disabled-fav'} /> 
                </span>
            </div>
        </article>
    )
}

export default NewsCard