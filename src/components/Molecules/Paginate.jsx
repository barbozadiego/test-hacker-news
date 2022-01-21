import { useState, useEffect, useRef } from "react"
import Icon from '../Atoms/Icon'
import '../../styles/paginate.css'

const Paginate = ({news}) => {

    const pages = useRef()

    const [pageCount, setPageCount] = useState(0)


    const prevPage = () => {
        setPageCount(pageCount > 0 ? pageCount - 1 : pageCount)
    } 

    const nextPage = () => {
        // setPageCount(pageCount < news.length ? pageCount + 1 : pageCount)
        setPageCount(pageCount < 7 ? pageCount + 1 : pageCount)
    } 

    const changePage = e => {
        e.stopPropagation()
        console.log(e.target.textContent, 10)
    } 


/*----------------------------------| Effects    |----------------------------------*/

    // useEffect(() => {
    //     let item = (pageCount * newsPerPage - newsPerPage) % news.length

    //     setCurrentNews(news.slice(item, item + newsPerPage))
    //     setItemCount(Math.ceil(news.length / newsPerPage))

    // }, [pageCount, news])


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
                news &&  news.slice(0, 8).map((p,i) => 
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