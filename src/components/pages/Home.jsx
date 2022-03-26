import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

import Icon from '../Atoms/Icon'
import Paginate from '../Organisms/Paginate'

import '../../styles/home.css'


const Home = () => {

    const select = useRef(),
          menu = useRef(),
          arrowDown = useRef()

    const [content, setContent] = useState('All')
    const [currentSelect, setCurrentSelect] = useLocalStorage('query', 'Select your news')


/*----------------------------------| Effects |----------------------------------*/

    useEffect(() => {
        setCurrentSelect(currentSelect)
    }, [currentSelect, setCurrentSelect])


/*----------------------------------| Functionalities |----------------------------------*/

    const selectListNews = (e) => {
        select.current.classList.toggle('display-picker')
        setCurrentSelect(e.target.textContent)
    } 

    const toggleListNews = () => {
        select.current.classList.toggle('display-picker')
        arrowDown.current.classList.toggle('animate-arrow')
    }

    const hideListNews = () => {
        if(select.current.className === 'display-picker') toggleListNews()
    }
    

    const showContent = e => {
         setContent(e.target.textContent)

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
            <ul ref={menu} className="menu" onClick={showContent}>
                <li className='active'>All</li>
                <li>My Faves</li>
            </ul>
        </nav>

        <section className='section-news'>
            <div className="box-news" tabIndex="0" onBlur={hideListNews}>
                <div className="news-select" onClick={toggleListNews}> 
                    { 
                      currentSelect !== 'Select your news' && 
                      <img src={`/images/${currentSelect}.png`} alt={`${currentSelect}-logo`} />
                    }
                    <span>{currentSelect}</span>
                </div>
                <ul ref={select} onClick={selectListNews}>
                    <li><img src="/images/angular.png" alt="angular-logo" />angular</li>
                    <li><img src="/images/reactjs.png" alt="react-logo" />reactjs</li>
                    <li><img src="/images/vuejs.png" alt="vue-logo" />vuejs</li>
                </ul>
                <span ref={arrowDown} className='arrow-down'>
                    <Icon tags='arrow-down'/>
                </span>
            </div>

            <Paginate itemsPerPage={8} content={content} query={currentSelect === 'Select your news' ? 'angular' : currentSelect} />
        </section>
      </>
    )

}

export default Home