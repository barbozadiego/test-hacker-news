import { useState, useEffect, useRef, useContext } from 'react'
import { FaAngular, FaVuejs, FaReact, FaAngleDown } from 'react-icons/fa'
import NewsContext from '../../context/NewsContext'

import Header from '../Molecules/Header'
import Paginate from '../Organisms/Paginate'

import '../../styles/home.css'


const Home = () => {

    const {currentNews, numberPages, newsQuery, setNewsQuery, setPage} = useContext(NewsContext),
          [currentNewsIcon, setCurrentNewsIcon] = useState(),
          selectionMenu = useRef(),
          arrowDown = useRef()

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
            setPage(0)
    } 

    const hideListNews = () => {
            if(selectionMenu.current.className === 'display-picker') toggleListNews()
    }

    const toggleListNews = () => {
        selectionMenu.current.classList.toggle('display-picker')
        arrowDown.current.classList.toggle('animate-arrow')
    }


    return (
        <> 
         <Header />
         <section className='section-news home'>
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

            <Paginate news={currentNews} numberPages={numberPages} />
         </section>
        </>
    )

}

export default Home