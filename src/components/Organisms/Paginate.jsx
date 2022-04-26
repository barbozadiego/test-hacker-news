import { useEffect, useState, useContext } from 'react'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'

import NewsContext from '../../context/NewsContext'
import ReactPaginate from 'react-paginate'
import News from './News'

import '../../styles/paginate.css'


const Paginate = () => {

  const [currentNews, setCurrentNews] = useState(),
        [pageCount, setPageCount] = useState(0),
        [itemOffset, setItemOffset] = useState(0),
        [numberPages, setNumberPages] = useState(),
        [page, setPage] = useState(0),
        [news, setNews] = useState(),
        itemsPerPage = 8


  const {newsQuery} = useContext(NewsContext)



useEffect(() => {
  fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${newsQuery}&page=${page}`)
  .then(res => res.json())
  .then(data => {
      let items = [] 
      data.hits.forEach(n => {
          if(n.author && n.story_title && n.story_url && n.created !== null) {
              items.push({
                  "id": n.created_at_i,
                  "author": n.author,
                  "title": n.story_title,
                  "url": n.story_url,
                  "created": n.created_at,
                  "favIcon": 'disabled-fav'
              })
          }
      })
      setNumberPages(data.nbPages)
      setNews(items)
  })

  }, [newsQuery, page])



  useEffect(() => {
      if(news) {
          const endOffset = itemOffset + itemsPerPage
          setCurrentNews(news.slice(itemOffset, endOffset))
          // setPageCount(Math.ceil(news.length / itemsPerPage))
          setPageCount(numberPages)
      }
  }, [itemOffset, itemsPerPage, news, numberPages])


/*----------------------------------| Functions |----------------------------------*/

  const handlePageClick = e => {
    // const newOffset = (e.selected * itemsPerPage) % news.length
    // setItemOffset(newOffset)
    setItemOffset(0)
    setPage(e.selected)
  }


  /*----------------------------------| Return |----------------------------------*/

  return (
    <>
      <News currentNews={currentNews} />
      <ReactPaginate
        nextLabel={<FaAngleRight />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={<FaAngleLeft />}
        pageClassName="page-item"
        // pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="link-prev"
        nextClassName="page-item"
        nextLinkClassName="link-next"
        // breakLabel="..."
        breakClassName="page-item"
        // breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="page-active"
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default Paginate