import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import useFetch from '../../hooks/useFetch'

import Items from '../Molecules/Items'
import Icon from '../Atoms/Icon'

import '../../styles/paginate.css'


const Paginate = ({itemsPerPage, query }) => {

  const [currentItems, setCurrentItems] = useState(),
        [pageCount, setPageCount] = useState(0),
        [itemOffset, setItemOffset] = useState(0),
        [page, setPage] = useState(0)

  const news = useFetch(query, page)


/*----------------------------------| Effects |----------------------------------*/

  useEffect(() => {
      if(news) {
          const endOffset = itemOffset + itemsPerPage
          setCurrentItems(news.slice(itemOffset, endOffset))
          // setPageCount(Math.ceil(news.length / itemsPerPage))
          // setPageCount(Math.ceil(1000 / itemsPerPage))
          setPageCount(50)
      }
  }, [itemOffset, itemsPerPage, news])


/*----------------------------------| Functions |----------------------------------*/

  const handlePageClick = e => {
    const newOffset = (e.selected * itemsPerPage) % news.length
    setItemOffset(newOffset)
    setPage(e.selected)
  }


  /*----------------------------------| Return |----------------------------------*/

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel={<Icon tags='arrow-right' />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={<Icon tags='arrow-left' />}
        pageClassName="page-item"
        // pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="link-prev"
        nextClassName="page-item"
        nextLinkClassName="link-next"
        breakLabel="..."
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