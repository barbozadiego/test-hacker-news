import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

import Header from '../Organisms/Header'
import MainMenu from '../Atoms/MainMenu'
import GridNews from '../Templates/GridNews'
import Loader from '../Molecules/Loader'

import '../../styles/home.css'
import Icon from '../Atoms/Icon'


const Home = () => {

    const select = useRef(),
          location = useLocation()

    // const [favesNews, setFavesNews] = useState()
    const [query, setQuery] = useState('Select your news')

    const news = useFetch(query === 'Select your news' ? 'angular' : query)

    const selectQuery = (e) => {
        select.current.classList.toggle('display-picker')
        setQuery(e.target.textContent)
    } 

    const showQuery = () => select.current.classList.toggle('display-picker')


    // useEffect(() => {
    //     select.current.className === 'display-picker' && window.addEventListener('click', () => alert('click'))     
    //     return () => window.removeEventListener('click', window)
    // })


    return (
        <>
         <Header />
         <MainMenu />
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
                news 
                ?  <div className="grid-news">
                        {
                            location.pathname === '/' 
                             ? <GridNews news={news} />
                             : console.log(location)
                        }
                    </div>

                :  <div className='box-loader'>
                     <Loader message='Getting data from server...' />  
                   </div>
            }

             
         </section>
        </>
    )

}

export default Home