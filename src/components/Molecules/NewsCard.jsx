// import { useState, useEffect, useRef } from 'react'
// import useLocalStorage from '../../hooks/useLocalStorage'

// import Icon from '../Atoms/Icon'
// import moment from 'moment'

// import '../../styles/news-card.css'


// // const NewsCard = ({author, title, url, created, news, id, className}) => {
// const NewsCard = ({author, title, url, created, id, className}) => {
        
//     const newsCard = useRef()

//     const [ago, setAgo] = useState(),
//           [currentNews, setCurrentNews] = useState({id, author, title, url, created, className}) 
              
//     const [favesStorage, setFavesStorage] = useLocalStorage('favesNews', [])


// /*----------------------------------| Functionalities |----------------------------------*/

//     const toggleFaves = e => {
//         // e.stopPropagation()

//         if(currentNews.className === 'card-active') {
//             // setFavesStorage([...favesStorage, currentNews])
//             currentNews.className = 'card-disabled'

//             let itemToDelete = favesStorage.find(n => n.id === id),
//                 index = favesStorage.indexOf(itemToDelete)

//             favesStorage[index].className = 'card-disabled'
//             setFavesStorage([...favesStorage.splice(index, 1)])

//             // console.log() 

//         } else { 
//             currentNews.className = 'card-active'
//             setFavesStorage([...favesStorage, currentNews])
//         }

       

//         // favesStorage.filter(n => n.id === currentNews.id)
//     //   let uva = favesStorage.filter(n => n.id === currentNews.id)
//         // console.log(uva)    
//         // console.log(favesStorage)    

//     }


// /*----------------------------------| Effects |----------------------------------*/

//     useEffect(() => {
//         setAgo(moment(created).fromNow())
//     }, [created])



//     return (
//         <article ref={newsCard} className="card" id={currentNews.id}>
//             <a href={currentNews.url} rel="noopener noreferrer" target="_blank">
//                 <div className="news-content">
//                     <span className='timer'>
//                         <Icon tags='timer' />{`${ago} by`} 
//                         <strong>{currentNews.author}</strong>
//                     </span>
//                     <h2>{currentNews.title}</h2>
//                 </div>
//             </a>

//             <div className="box-favorite">
//                 <span onClick={toggleFaves} className='favorite'>
//                     {currentNews.className}
//                     <Icon tags={currentNews.className !== 'card-disabled' ? 'active-fav' : 'disabled-fav'} /> 
//                 </span>
//             </div>
//         </article>
//     )
// }

// export default NewsCard