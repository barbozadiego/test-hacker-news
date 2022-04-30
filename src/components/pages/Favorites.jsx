import { useEffect, useContext } from 'react'
import Header from '../Molecules/Header'
import Paginate from '../Organisms/Paginate'
import NewsContext from '../../context/NewsContext'
import { Link } from 'react-router-dom'


const Favorites = () => {

  const {favesStorage, itemsPerPage} = useContext(NewsContext)

    return (
      <> 
       <Header />
       <section className='section-news'>
          {
            favesStorage.length > 0 
                ? <Paginate news={favesStorage} numberPages={favesStorage.length / itemsPerPage} />
                : <div className='alert'>
                      <hgroup>
                        <h1>Looks like you don't have favorites yet</h1>
                        <h2><Link to='/'>Explore News</Link></h2>
                      </hgroup>
                  </div>   
          }
       </section>
      </>
    )
}

export default Favorites

