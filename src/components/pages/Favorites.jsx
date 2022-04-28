import Header from '../Molecules/Header'
import NewsSection from '../Molecules/NewsSection'

import useLocalStorage from '../../hooks/useLocalStorage'

import { useState, useEffect } from 'react'


const Favorites = () => {

    const [favesStorage, setFavesStorage] = useLocalStorage('favesStorage', [])

    return (
        <>
          <Header />
          <NewsSection news={favesStorage} />
        </>
    )
}

export default Favorites


/* <div className='no-news-yet'>
<h2>No news yet</h2>
</div>     */


// const [favesStorage, setFavesStorage] = useLocalStorage('favesStorage', [])


/*----------------------------------| Effects |----------------------------------*/

