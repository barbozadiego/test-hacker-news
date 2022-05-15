import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header>
                <Link to='/'><img src="/images/hacker-news.svg" alt="hacker-news-logo" /></Link>
            </header>
            <nav>
                <ul className="menu">
                    <li><NavLink to="/">All</NavLink></li>
                    <li><NavLink to="/favorites">My Faves</NavLink></li>
                </ul>
            </nav>
        </>
  )
}

export default Header