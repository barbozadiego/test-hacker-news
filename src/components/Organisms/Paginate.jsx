import { useEffect, useState, useRef, useContext } from 'react'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import NewsContext from '../../context/NewsContext'

import NewsCard from '../Molecules/NewsCard'
import Loader from '../Molecules/Loader'

import '../../styles/paginate.css'
import '../../styles/newsCard.css'


const Items = ({ currentNews }) => {

  const {newsGrid, favesStorage} = useContext(NewsContext)

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
                    />)
              }
            </div>

          :  <div className='box-loader'>
                <Loader message='Getting data from server...' />  
             </div>
      }
    </>
  )
}


const Paginate = ({news}) => {

  const [currentNews, setCurrentNews] = useState(),
        [pageCount, setPageCount] = useState(50),
        [itemOffset, setItemOffset] = useState(0),
        // [news, setNews] = useLocalStorage('news', []),
        itemsPerPage = 8


  const {setPage, numberPages} = useContext(NewsContext) 

  useEffect(() => {
      if(news) {
          const endOffset = itemOffset + itemsPerPage
          setCurrentNews(news.slice(itemOffset, endOffset))
          // setPageCount(Math.ceil(news.length / itemsPerPage))
          
          // setPageCount(numberPages)
      }
    }, [itemOffset, itemsPerPage, news, numberPages])



  const handlePageClick = e => {
    // const newOffset = (e.selected * itemsPerPage) % news.length
    // setItemOffset(newOffset)
    setItemOffset(0)
    setPage(e.selected)
  }


  return (
    <>
      <Items currentNews={currentNews} />
      {
        news && news.length > itemsPerPage && 
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