import { useState, useEffect, useRef } from "react"
import Icon from '../Atoms/Icon'
import '../../styles/paginate.css'

const Paginate = ({news}) => {

    const pages = useRef()
        //   newsPerPage = 8

   const [pageCount, setPageCount] = useState(0)

    const prevPage = () => {
        setPageCount(pageCount > 0 ? pageCount - 1 : pageCount)
    } 

    const nextPage = () => {
        setPageCount(pageCount < news.length ? pageCount + 1 : pageCount)
    } 

    const changePage = e => console.log(pageCount)


    /*----------------------------------| Effects |----------------------------------*/

    useEffect(() => {
        if(news) {
            let allPages = [...pages.current.children],
                withClass = allPages.filter(p => p.className === 'page page-active')

            if(withClass) withClass.forEach(p => p.classList.remove('page-active'))
            allPages[pageCount].classList.add('page-active')
        } 
    }, [pageCount, news])


    return (
        <div className="box-paginate">
            <span onClick={prevPage} className='arrow-left'><Icon tags='arrow-left' /></span>

            <div ref={pages} className="pages">
                {
                 news &&  news.slice(0, 9).map((p,i) => 
                        <span 
                            onClick={changePage}
                            className='page' 
                            key={i}>
                                {i+1}
                        </span>)    
                }
            </div>

            <span onClick={nextPage} className='arrow-right'><Icon tags='arrow-right' /></span>
        </div>
     )
    }

export default Paginate 