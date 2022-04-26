import { useState, useRef, useEffect, useContext } from 'react'
import { FaAngular, FaVuejs, FaReact, FaAngleDown } from 'react-icons/fa'

import Header from '../Molecules/Header'
import Paginate from '../Organisms/Paginate'
import NewsContext from '../../context/NewsContext'

import '../../styles/home.css'


const Home = () => {

    const selectionMenu = useRef(),
          arrowDown = useRef()

    const {newsQuery, setNewsQuery} = useContext(NewsContext)
    const [currentNewsIcon, setCurrentNewsIcon] = useState()


    useEffect(() => {
        setNewsQuery(newsQuery)
    }, [newsQuery, setNewsQuery])


    const selectListNews = (e) => {
        selectionMenu.current.classList.toggle('display-picker')
        setNewsQuery(e.target.textContent)
    } 


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



    const toggleListNews = () => {
        selectionMenu.current.classList.toggle('display-picker')
        arrowDown.current.classList.toggle('animate-arrow')
    }

    const hideListNews = () => {
        if(selectionMenu.current.className === 'display-picker') toggleListNews()
    }


    return (
      <>
        <Header />
        <section className='section-news'>
            <div className="box-news"  onBlur={hideListNews}>
            {/* <div className="box-news" tabIndex="0" onBlur={hideListNews}> */}
                <div className="news-query" onClick={toggleListNews}> 
                    { 
                      newsQuery !== 'Select your news' && <span className={newsQuery}>{currentNewsIcon}</span>
                    }
                    <span>{newsQuery}</span>
                </div>
                <ul ref={selectionMenu} onClick={selectListNews}>
                    <li><FaAngular />angular</li>
                    <li><FaReact />reactjs</li>
                    <li><FaVuejs />vuejs</li>
                </ul>
                <span ref={arrowDown} className='arrow-down'>
                    <FaAngleDown />
                </span>
            </div>

            {/* <Paginate content={content} query={newsQuery === 'Select your news' ? 'angular' : newsQuery} /> */}
            <Paginate />
        </section>
      </>
    )

}

export default Home