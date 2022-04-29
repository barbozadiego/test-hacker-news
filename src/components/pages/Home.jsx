import { useContext } from 'react'
import NewsContext from '../../context/NewsContext'

import Header from '../Molecules/Header'
import SelectNews from '../Molecules/SelectNews'
import Paginate from '../Organisms/Paginate'


const Home = () => {
    const {currentNews} = useContext(NewsContext)

    return (
        <> 
         <Header />
         <section className='section-news'>
            <SelectNews />
            <Paginate news={currentNews} />
         </section>
        </>
    )

}

export default Home