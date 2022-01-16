import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Header from '../Organisms/Header'
import MainMenu from '../Atoms/MainMenu'
import GridNews from '../Templates/GridNews'
import Loader from '../Molecules/Loader'

import '../../styles/home.css'


const Home = () => {

    const location = useLocation()

    const [news, setNews] = useState()
    // const [favesNews, setFavesNews] = useState()


    useEffect(() => {
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

    return (
        <>
         <Header />
         <MainMenu />
            {
                news 
                ?  <section className="grid-news">
                        {
                            location.pathname === '/' 
                             ? <GridNews news={news} />
                             : console.log(location)
                        }
                    </section>

                : <div className='box-loader'>
                     <Loader message='Getting data from server...' />  
                  </div>
            }

        </>
    )

}

export default Home