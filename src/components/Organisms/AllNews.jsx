import NewsCard from '../Molecules/NewsCard'
import Loader from '../Molecules/Loader'

const AllNews = ({ news }) => {
    return (
        <>
            {
                news 
                ?  <div className="grid-news">
                        {   
                            news.map(n => 
                            <NewsCard 
                                id={n.id}
                                className={n.className}
                                key={n.id}
                                author={n.author}
                                title={n.title}
                                url={n.url}
                                created={n.created}
                                news={news}
                            />)   
                        }
                    </div>

                :   <div className='box-loader'>
                        <Loader message='Getting data from server...' />  
                    </div>
            }
        </>
    )
}

export default AllNews