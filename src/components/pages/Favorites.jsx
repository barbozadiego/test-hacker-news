import { useState, useEffect, useContext } from 'react'
import Header from '../Molecules/Header'
import SelectNews from '../Molecules/SelectNews'
import Paginate from '../Organisms/Paginate'
import NewsContext from '../../context/NewsContext'
// import { useState, useEffect } from 'react'



const Favorites = () => {

  const {favesStorage} = useContext(NewsContext)

    return (
      <> 
       <Header />
       <section className='section-news'>
          <SelectNews />
          {
            favesStorage.length > 0 
                ? <Paginate news={favesStorage} />
                : <div className='no-news-yet'>
                      <h2>No news yet</h2>
                  </div>   
          }
       </section>
      </>
    )
}

export default Favorites

