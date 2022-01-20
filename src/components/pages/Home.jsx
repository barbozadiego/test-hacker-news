import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import useFetch from '../../hooks/useFetch'
import useLocalStorage from '../../hooks/useLocalStorage'

import News from '../Organisms/News'
import Icon from '../Atoms/Icon'

import '../../styles/home.css'



const Home = () => {

    const select = useRef(),
          menu = useRef()

    const [queryPage, setQueryPage] = useState(0)

    const [query, setQuery] = useLocalStorage('query', 'Select your news')
    const news = useFetch(query === 'Select your news' ? 'angular' : query, queryPage)


/*----------------------------------| Functionalities |----------------------------------*/


    const showQuery = () => select.current.classList.toggle('display-picker')

    const selectQuery = (e) => {
        select.current.classList.toggle('display-picker')
        setQuery(e.target.textContent)
    } 

    const showContent = e => {
         let list = Array.from(menu.current.children),
             withClass = list.filter(el => el.className === 'active')

         if(withClass) withClass.forEach(el => el.classList.remove('active'))
            e.target.classList.add('active')
    }


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
            
            <News news={news}  />
             
         </section>
        </>
    )

}

export default Home