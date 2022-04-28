import { useState, useEffect, useRef, useContext } from 'react'
import { FaAngular, FaVuejs, FaReact, FaAngleDown } from 'react-icons/fa'

import Paginate from '../Organisms/Paginate'
import NewsContext from '../../context/NewsContext'
import useLocalStorage from '../../hooks/useLocalStorage'

import '../../styles/news-section.css'


const NewsSection = ({news}) => {

  const {newsQuery, setNewsQuery} = useContext(NewsContext)
  const [currentNewsIcon, setCurrentNewsIcon] = useState()

  const selectionMenu = useRef(),
        arrowDown = useRef()

  const [favesStorage, setFavesStorage] = useLocalStorage('favesStorage', [])
  const [newsToShow, setNewsToShow] = useState()

    useEffect(() => {   
        if(news) {
            const currentFaves = [...favesStorage, ...news.filter(n => news.findIndex(el => el.favIcon !== n.favIcon) !== -1 )]
                if(currentFaves.every(el => el.favIcon === 'active-fav') && currentFaves) {
                    for(let i=0; i < currentFaves.length; i++) {
                        let itemsToFaves = news.find(n => n.id === currentFaves[i].id),
                            indices = news.indexOf(itemsToFaves)

                        if(itemsToFaves && favesStorage.length > 0) news[indices].favIcon = 'active-fav'
                    }
                }

             setNewsToShow(news)
       }

    }, [news, favesStorage, setFavesStorage])


  useEffect(() => {
    switch (newsQuery) {
        case 'angular':
            setCurrentNewsIcon(<FaAngular />)
            break;
        case 'reactjs':
            setCurrentNewsIcon(<FaReact />)
            break;
        case 'vuejs':
            setCurrentNewsIcon(<FaVuejs />)
            break;
        default:
            // setCurrentNewsIcon(<FaAngleDown />)
    }
  }, [newsQuery])


  const selectListNews = (e) => {
        selectionMenu.current.classList.toggle('display-picker')
        setNewsQuery(e.target.textContent)
        arrowDown.current.classList.toggle('animate-arrow')
  } 

  const hideListNews = () => {
        if(selectionMenu.current.className === 'display-picker') toggleListNews()
  }

  const toggleListNews = () => {
    selectionMenu.current.classList.toggle('display-picker')
    arrowDown.current.classList.toggle('animate-arrow')
}
    
  return (
        <section className='section-news'>
            <div className="box-news" tabIndex="0" onBlur={hideListNews}>
                <div className="news-query" onClick={toggleListNews}> 
                    { 
                    newsQuery !== 'Select your news' && <span className={newsQuery}>{currentNewsIcon}</span>
                    }
                    <span>{newsQuery}</span>
                    <span ref={arrowDown} className='arrow-down'><FaAngleDown /></span>
                </div>
                <ul ref={selectionMenu} onClick={selectListNews}>
                    <li><FaAngular />angular</li>
                    <li><FaReact />reactjs</li>
                    <li><FaVuejs />vuejs</li>
                </ul>
            </div>

                {
                  newsToShow &&  <Paginate news={newsToShow} />
                }
            
            {
                // news.length > 0 
                //     ? <Paginate news={news} />
                //     :  <div className='no-news-yet'>
                //             <h2>No news yet</h2>
                //        </div>   
            }
        </section>
  )
}

export default NewsSection