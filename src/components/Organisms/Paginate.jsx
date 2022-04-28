import { useEffect, useState, useContext } from 'react'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'

import NewsContext from '../../context/NewsContext'
import ReactPaginate from 'react-paginate'

import '../../styles/paginate.css'
import '../../styles/newsCard.css'
import useLocalStorage from '../../hooks/useLocalStorage'

import { useRef } from 'react'

import Loader from '../Molecules/Loader'
import NewsCard from '../Molecules/NewsCard'


const Items = ({ currentNews }) => {

  const refCard = useRef(),
        [favesStorage, setFavesStorage] = useLocalStorage('favesStorage', [])

  const toggleFaves = currentCard => {

      let allCards = Array.from(refCard.current.children)

      let addFav = allCards.filter(n => n.id === currentCard.id)[0],
          index = allCards.indexOf(addFav)

      let removeFav = favesStorage.filter(n => n.id.toString() === currentCard.id)[0],
          indexRemove = favesStorage.indexOf(removeFav)

      let repeatedCard = favesStorage.includes(removeFav)
    
      if(!repeatedCard) {
          currentNews[index].favIcon = 'active-fav'
          setFavesStorage([...favesStorage, currentNews[index]])
      } else {
          currentNews[index].favIcon = 'disabled-fav'
          favesStorage.splice(indexRemove, 1)
          setFavesStorage([...favesStorage])
      }
  }

  return (    
    <>
      {
        currentNews && currentNews.length > 0
          ? <div ref={refCard} className="grid-news">
              {  
                  currentNews.map(item => 
                      <NewsCard id={item.id}
                          key={item.id}
                          title={item.title}
                          url={item.url}
                          created={item.created}
                          author={item.author}
                          toggleFaves={toggleFaves}
                          favIcon={item.favIcon}
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
        [pageCount, setPageCount] = useState(0),
        [itemOffset, setItemOffset] = useState(0),
        // [numberPages, setNumberPages] = useState(),
        // [page, setPage] = useState(0),
        // [news, setNews] = useLocalStorage('news', []),
        itemsPerPage = 8



  useEffect(() => {

  }, [])


  // const {newsQuery} = useContext(NewsContext)

  
// useEffect(() => {
//   fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${newsQuery}&page=${page}`)
//   .then(res => res.json())
//   .then(data => {
//       let items = [] 
//       data.hits.forEach(n => {
//           if(n.author && n.story_title && n.story_url && n.created !== null) {
//               items.push({
//                   "id": n.created_at_i,
//                   "author": n.author,
//                   "title": n.story_title,
//                   "url": n.story_url,
//                   "created": n.created_at,
//                   "favIcon": 'disabled-fav'
//               })
//           }
//       })
//       setNumberPages(data.nbPages)
//       setNews(items)
//   })

//   }, [newsQuery, page])



  useEffect(() => {
      if(news) {
          const endOffset = itemOffset + itemsPerPage
          setCurrentNews(news.slice(itemOffset, endOffset))
          // setPageCount(Math.ceil(news.length / itemsPerPage))
          
          // setPageCount(numberPages)
      }
    }, [itemOffset, itemsPerPage, news])
    // }, [itemOffset, itemsPerPage, news, numberPages])



  const handlePageClick = e => {
    // const newOffset = (e.selected * itemsPerPage) % news.length
    // setItemOffset(newOffset)
    setItemOffset(0)
    // setPage(e.selected)
  }


  return (
    <>
      <Items currentNews={currentNews} />
      {
        currentNews && currentNews.length > itemsPerPage && 
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