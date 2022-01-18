// import { useState, useRef } from 'react'
import { useState, useEffect, useRef } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

import Header from '../Organisms/Header'
import AllNews from '../Organisms/AllNews'
import FaveNews from '../Organisms/FaveNews'
import Icon from '../Atoms/Icon'

import useFetch from '../../hooks/useFetch'
import '../../styles/home.css'


const Home = () => {

    const select = useRef(),
          menu = useRef(),
          pages = useRef()

    const [content, setContent] = useState('All')

    const [currentPage, setCurrentPage] = useState(0),
          [query, setQuery] = useLocalStorage('query', 'Select your news')

    const news = useFetch(query === 'Select your news' ? 'angular' : query, currentPage)


    const prevPage = () => setCurrentPage(currentPage - 1)

    const nextPage = () => setCurrentPage(currentPage + 1)


    const changePage = e => {
        // setCurrentPage(parseInt(e.target.textContent,10))
        console.log(currentPage)
    }


    const selectQuery = (e) => {
        select.current.classList.toggle('display-picker')
        setQuery(e.target.textContent)
    } 

    const showQuery = () => select.current.classList.toggle('display-picker')
    

    const showContent = e => {
         setContent(e.target.textContent)

         let list = Array.from(menu.current.children),
             withClass = list.filter(el => el.className === 'active')

         if(withClass) withClass.forEach(el => el.classList.remove('active'))
            e.target.classList.add('active')
    }


    useEffect(() => {
        if(news) {
            let allPages = [...pages.current.children],
                withClass = allPages.filter(p => p.className === 'page page-active')

            if(withClass) withClass.forEach(p => p.classList.remove('page-active'))
            allPages[currentPage].classList.add('page-active')
        } 
    })


        // useEffect(() => {
    //     select.current.className === 'display-picker' && window.addEventListener('click', () => alert('click'))     
    //     return () => window.removeEventListener('click', window)
    // })



    return (
        <>
         <Header />
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
                news && content === 'All'
                    ? <AllNews news={news} />
                    : <FaveNews />
            }
            
            <div className="box-paginate">
                <span onClick={prevPage} className='arrow-left'><Icon tags='arrow-left' /></span>

                <div ref={pages} className="pages">
                    {
                      news && news.map((p,i) => <span 
                                                 onClick={changePage}
                                                 className='page' 
                                                 key={i}>
                                                       {i+1}
                                                </span>)
                    }
                </div>

                <span onClick={nextPage} className='arrow-right'><Icon tags='arrow-right' /></span>
            </div>
             
         </section>
        </>
    )

}

export default Home