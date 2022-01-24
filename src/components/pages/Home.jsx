import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

import Icon from '../Atoms/Icon'
import Paginate from '../Organisms/Paginate'

import '../../styles/home.css'



const Home = () => {

    const select = useRef(),
          menu = useRef()

    // const [currentQuery, setCurrentQuery] = useState('All')
    const [query, setQuery] = useLocalStorage('query', 'Select your news')


/*----------------------------------| Effects |----------------------------------*/

    useEffect(() => {
        setQuery(query)
    }, [query, setQuery])


/*----------------------------------| Functionalities |----------------------------------*/


    const showQuery = () => select.current.classList.toggle('display-picker')

    const selectQuery = (e) => {
        select.current.classList.toggle('display-picker')
        setQuery(e.target.textContent)
    } 

    const showContent = e => {
         setQuery(e.target.textContent)

         let list = Array.from(menu.current.children),
             withClass = list.filter(el => el.className === 'active')

         if(withClass) withClass.forEach(el => el.classList.remove('active'))
            e.target.classList.add('active')
    }

/*----------------------------------| Return |----------------------------------*/
 
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

            <Paginate itemsPerPage={8} query={query === 'Select your news' ? 'angular' : query} />
         </section>
        </>
    )

}

export default Home