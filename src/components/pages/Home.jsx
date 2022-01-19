import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import useFetch from '../../hooks/useFetch'
import useLocalStorage from '../../hooks/useLocalStorage'

import AllNews from '../Organisms/AllNews'
import FaveNews from '../Organisms/FaveNews'
import Icon from '../Atoms/Icon'

import '../../styles/home.css'


const Home = () => {

    const select = useRef(),
          menu = useRef(),
          pages = useRef()
        //   newsPerPage = 8

    const [content, setContent] = useState('All'),
          [pageCount, setPageCount] = useState(0),
          [queryPage, setQueryPage] = useState(0)
        //   [itemCount, setItemCount] = useState(0)

    const [query, setQuery] = useLocalStorage('query', 'Select your news')
    const news = useFetch(query === 'Select your news' ? 'angular' : query, queryPage)



/*----------------------------------| Functionalities |----------------------------------*/

    const prevPage = () => {
        setPageCount(pageCount > 0 ? pageCount - 1 : pageCount)
    } 

    const nextPage = () => {
        setPageCount(pageCount < news.length ? pageCount + 1 : pageCount)
    } 

    const changePage = e => console.log(pageCount)

    const showQuery = () => select.current.classList.toggle('display-picker')

    const selectQuery = (e) => {
        select.current.classList.toggle('display-picker')
        setQuery(e.target.textContent)
    } 

    const showContent = e => {
         setContent(e.target.textContent)

         let list = Array.from(menu.current.children),
             withClass = list.filter(el => el.className === 'active')

         if(withClass) withClass.forEach(el => el.classList.remove('active'))
            e.target.classList.add('active')
    }

/*----------------------------------| Effects |----------------------------------*/

    useEffect(() => {
        if(news) {
            let allPages = [...pages.current.children],
                withClass = allPages.filter(p => p.className === 'page page-active')

            if(withClass) withClass.forEach(p => p.classList.remove('page-active'))
            allPages[pageCount].classList.add('page-active')
        } 
    })


    return (
        <>
         <header>
           <Link to='/'><img src="/images/hacker-news.svg" alt="hacker-news-logo" /></Link>
        </header>

        <nav>
            <ul ref={menu} className="menu">
                <li onClick={showContent} className='active'>All</li>
                <li onClick={showContent}>My Faves</li>
            </ul>
        </nav>

         <section className='section-news'>
             
            <div className="box-news">
                <div className="news-select" onClick={showQuery}> 
                    { 
                    query !== 'Select your news' && <img src={`/images/${query}.png`} alt={`${query}-logo`} />
                    }
                    <span>{query}</span>
                </div>
                <ul ref={select}>
                    <li onClick={selectQuery}><img src="/images/angular.png" alt="angular-logo" />angular</li>
                    <li onClick={selectQuery}><img src="/images/reactjs.png" alt="react-logo" />reactjs</li>
                    <li onClick={selectQuery}><img src="/images/vuejs.png" alt="vue-logo" />vuejs</li>
                </ul>
                <span onClick={showQuery} className='arrow-down'><Icon tags='arrow-down'/></span>
            </div>
            
            {
                content === 'All'
                    ? <AllNews news={ news } />
                    : <FaveNews />
            }
            
            {   news &&
                <div className="box-paginate">
                    <span onClick={prevPage} className='arrow-left'><Icon tags='arrow-left' /></span>

                    <div ref={pages} className="pages">
                        {
                          news.slice(0, 9).map((p,i) => 
                                <span 
                                    onClick={changePage}
                                    className='page' 
                                    key={i}>
                                        {i+1}
                                </span>)    
                        }
                    </div>

                    <span onClick={nextPage} className='arrow-right'><Icon tags='arrow-right' /></span>
                </div>
            }
             
         </section>
        </>
    )

}

export default Home