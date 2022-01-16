import { NavLink } from "react-router-dom"

import '../../styles/main-menu.css'

const MainMenu = () => {
    return(
        <nav>
            <ul className="menu">
                <li><NavLink to='/' activestyle='active' className='active'>All</NavLink></li>
                <li><NavLink to='/favorites' activestyle='active'>My Faves</NavLink></li>
            </ul>
        </nav>
    )
}

export default MainMenu