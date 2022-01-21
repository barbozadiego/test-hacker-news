import { useState, useEffect, useRef } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import useFetch from '../../hooks/useFetch'
import Paginate from '../Molecules/Paginate'

import moment from 'moment'
import Icon from '../Atoms/Icon'
import Loader from '../Molecules/Loader'

import '../../styles/news.css'


const News = ({query, content}) => {

    const newsCard = useRef()
    const [newsStorage, setNewsStorage] = useLocalStorage('newsStorage', [])
    const [favesStorage, setFavesStorage] = useLocalStorage('favesStorage', [])
    const [showNews, setShowNews] = useState()
    const news = useFetch(query === 'Select your news' ? 'angular' : query, 0)
    

    // const [pageCount, setPageCount] = useState(0)
    //       [articlePage ,setArticlePage] = useState(),
    //       [item, setItem] = useState(),
    //       newsPerPage = 8


/*----------------------------------| Effects |----------------------------------*/

    // useEffect(() => {
    //     if(showNews) {
    //         let item = (pageCount * newsPerPage - newsPerPage) % showNews.length

    //         setShowNews(new.slice(item, item + newsPerPage))
    //         setArticlePage(Math.ceil(showNews.length / newsPerPage))
    //     }
    // }, [pageCount, showNews])


    useEffect(() => {
        setNewsStorage(news)
    }, [news, setNewsStorage])

    useEffect(() => {
        setShowNews(content === 'All' ? newsStorage : favesStorage)
    }, [content, newsStorage, favesStorage])


/*----------------------------------| Functionalities |----------------------------------*/


    const toggleFaves = e => {
        e.stopPropagation()
        let currentFav = e.target.parentElement.parentElement.parentElement


        
        if(currentFav.className === 'card') {
            let currentNews = newsStorage.find(n => n.id.toString() === currentFav.id), 
            index = newsStorage.indexOf(currentNews)

            // if(currentFav.id === currentNews.id.toString()) {
            //     console.log('yes')
            // } 

            
                if(currentNews.className === 'card-active') {
                    currentNews.className = 'card-disabled'

                    // setFavesStorage([...favesStorage.splice(index, 1)])
        
                    // favesStorage[index].className = 'card-disabled'
                } else { 
                    currentNews.className = 'card-active'
                    setFavesStorage([...favesStorage, currentNews])
                }

        }
    }



    return (
        <>
            {
            showNews && showNews.length > 0
                ?  <div className="grid-news">
                        {   
                          showNews.slice(0,8).map(n => 
                            <article ref={newsCard} className="card" id={n.id} key={n.id}>
                                <a href={n.url} rel="noopener noreferrer" target="_blank">
                                    <div className="news-content">
                                        <span className='timer'>
                                            <Icon tags='timer' />{`${moment(n.created).fromNow()} by`} 
                                            <strong>{n.author}</strong>
                                        </span>
                                        <h2>{n.title}</h2>
                                    </div>
                                </a>
                    
                                <div className="box-favorite">
                                    <span onClick={toggleFaves} className='favorite'>
                                        <Icon tags={n.className !== 'card-disabled' ? 'active-fav' : 'disabled-fav'} /> 
                                    </span>
                                </div>
                            </article>
                        )
                        }
                    </div>

                : <div>
                    {   
                        content === 'All'
                        ?  <div className='box-loader'>
                                <Loader message='Getting data from server...' />  
                            </div>

                        :  <div className='no-news-yet'>
                                <h2>No news yet</h2>
                            </div>  
                    }
                </div>
            }

            { 
              showNews && showNews.length > 0 &&
                  <Paginate news={showNews} 
                            // articlePage={articlePage} 
                            // count={pageCount} 
                            // newsPerPage={newsPerPage} 
                            /> 
            }
        </>
    )
}

export default News