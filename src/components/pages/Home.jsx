import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import Header from '../Organisms/Header'
import MainMenu from '../Atoms/MainMenu'
import GridNews from '../Templates/GridNews'
import Loader from '../Molecules/Loader'

import '../../styles/home.css'
import Icon from '../Atoms/Icon'


const Home = () => {

    const select = useRef()
    const location = useLocation()

    const [news, setNews] = useState()
    const [category, setCategory] = useState('Select your news')
    // const [favesNews, setFavesNews] = useState()


    useEffect(() => {
        // fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${category}&page=0`)
        fetch('https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=0')
        .then(res => res.json())
        .then(data => {

            let todas = [] 
            data.hits.forEach(el => {
                if(el.author !== null && el.story_title !== null && el.story_url !== null && el.created !== null) {
                    todas.push({
                        "author": el.author,
                        "title": el.story_title,
                        "url": el.story_url,
                        "created": el.created_at
                    })
                }
            })

            setNews(todas)
        })


    }, [])

    const selectCategory = () => {
        select.current.classList.toggle('display-picker')
    }

    const changeCategory = (e) => setCategory(e.target.textContent)


    return (
        <>
         <Header />
         <MainMenu />
         <section className='main-container'>
            <div className="news-picker">
                <div onClick={selectCategory} >{category}</div>
                <ul ref={select}>
                    <li onClick={changeCategory}><img src="/images/angular.png" alt="angular-logo" /> angular</li>
                    <li onClick={changeCategory}><img src="/images/reactjs.png" alt="react-logo" /> reactjs</li>
                    <li onClick={changeCategory}><img src="/images/vuejs.png" alt="vue-logo" /> vuejs</li>
                </ul>
                <span onClick={selectCategory} className='arrow-down'><Icon tags='arrow-down'/></span>
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

            {category}
             
         </section>
        </>
    )

}

export default Home