import NewsCard from '../Molecules/NewsCard'

const GridNews = ({news}) => {
    return(
        news.slice(0,8).map((n,i) => <NewsCard 
                                        author={n.author}
                                        title={n.title}
                                        url={n.url}
                                        created={n.created}
                                        key={i}
                                    />)
    )
}

export default GridNews