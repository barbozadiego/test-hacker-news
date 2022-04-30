import { useEffect, useState, useRef, useContext } from 'react'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import NewsContext from '../../context/NewsContext'

import NewsCard from '../Molecules/NewsCard'
import Loader from '../Molecules/Loader'

import '../../styles/paginate.css'


const Items = ({ currentNews }) => {

  const {favesStorage, setFavesStorage} = useContext(NewsContext),
        newsGrid = useRef()

  const toggleFaves = card => {

    const allCards = Array.from(newsGrid.current.children),
          addFav = allCards.filter(n => n.id === card.id)[0],
          addIndex = allCards.indexOf(addFav),
          removeFav = favesStorage.filter(n => n.id.toString() === card.id)[0],
          removeIndex = favesStorage.indexOf(removeFav),
          repeatedCard = favesStorage.includes(removeFav)

      if(repeatedCard) {
        favesStorage.splice(removeIndex, 1)
        setFavesStorage([...favesStorage])
      } else {
        setFavesStorage([...favesStorage, currentNews[addIndex]])
      }
  }

  return (    
    <>
      {
        currentNews && currentNews.length > 0
          ? <div ref={newsGrid} className="grid-news">
              {  
                currentNews.map(item => 
                    <NewsCard id={item.id}
                              key={item.id}
                              title={item.title}
                              url={item.url}
                              created={item.created}
                              author={item.author}
                              isFaves={ favesStorage.includes(favesStorage.filter(n => n.id === item.id)[0]) }
                              toggleFaves={toggleFaves}
                    />
                )
              }
            </div>

          :  <div className='box-loader'>
                <Loader message='Getting data from server...' />  
            </div>
      }
    </>
  )
}


const Paginate = ({news, numberPages}) => {

  const {setPage, itemsPerPage} = useContext(NewsContext) 

  const [currentNews, setCurrentNews] = useState(),
        [pageCount, setPageCount] = useState(),
        [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    if(news){
      const endOffset = itemOffset + itemsPerPage
      setCurrentNews(news.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(numberPages * itemsPerPage / itemsPerPage))
      }
    }, [itemOffset, itemsPerPage, news])


  const handlePageClick = e => {
    const newOffset = (e.selected * itemsPerPage) % news.length
    setItemOffset(newOffset)
    setPage(e.selected)
  }


  return (
    <>
      <Items currentNews={currentNews} />
      {
        pageCount && pageCount > 1 && 
        <ReactPaginate
          nextLabel={<FaAngleRight />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={<FaAngleLeft />}
          pageClassName="page-item"
          previousClassName="page-item"
          previousLinkClassName="link-prev"
          nextClassName="page-item"
          nextLinkClassName="link-next"
          breakClassName="page-item"
          containerClassName="pagination"
          activeClassName="page-active"
          renderOnZeroPageCount={null}
          // breakLabel="..."
          // pageLinkClassName="page-link"
          // breakLinkClassName="page-link"
        />
      }
    </>
  )
}

export default Paginate