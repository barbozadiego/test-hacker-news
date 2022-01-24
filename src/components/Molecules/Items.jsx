import NewsCard from '../Molecules/NewsCard'
import '../../styles/news.css'

const Items = ({ currentItems }) => {
    return (
      <>
      <div className="grid-news">
        {
         currentItems &&
         currentItems.map(item => 
            <NewsCard id={item.id}
                key={item.id}
                title={item.title}
                url={item.url}
                created={item.created}
                author={item.author}
            //   toggleFaves={toggleFaves}
                favIcon={item.favIcon}
            />)
       }
       </div>
      </>
    )
}

export default Items

