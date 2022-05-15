import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Favorites from './Pages/Favorites'

import '../styles/styles.css'

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/favorites' element={ <Favorites/>} />
      </Routes>
    </Router>
  )
}

export default App
