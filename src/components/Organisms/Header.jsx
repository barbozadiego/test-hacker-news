import { Link } from 'react-router-dom'
import '../../styles/header.css'

const Header = () => {
    return (
        <header>
           <Link to='/'><img src="/images/hacker-news.svg" alt="hacker-news-logo" /></Link>
        </header>
    )
}

export default Header