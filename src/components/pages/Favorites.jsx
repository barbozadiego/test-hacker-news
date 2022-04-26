/* <div className='no-news-yet'>
<h2>No news yet</h2>
</div>     */


// const [favesStorage, setFavesStorage] = useLocalStorage('favesStorage', [])
// import useLocalStorage from '../../hooks/useLocalStorage'

/*----------------------------------| Effects |----------------------------------*/

    // useEffect(() => {

    //     if(currentNews) {
    //         const currentFaves = [...favesStorage, ...currentNews.filter(n => currentNews.findIndex(el => el.favIcon !== n.favIcon) !== -1 )]
    //             if(currentFaves.every(el => el.favIcon === 'active-fav') && currentFaves) {
    //                 for(let i=0; i < currentFaves.length; i++) {
    //                     let itemsToFaves = currentNews.find(n => n.id === currentFaves[i].id),
    //                         indices = currentNews.indexOf(itemsToFaves)

    //                     if(itemsToFaves && favesStorage.length > 0) currentNews[indices].favIcon = 'active-fav'
    //                 }
    //             }

    //         //  setNewsToShow(content === 'All' ? currentNews : favesStorage)
    //          setNewsToShow(currentNews)
    //    }

    // }, [currentNews, favesStorage, setFavesStorage])

    

import Header from "../Molecules/Header"

const Favorites = () => {
    return (
        <>
            <Header />
            <div>Favorites</div>
        </>
    )
}

export default Favorites