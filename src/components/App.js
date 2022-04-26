import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NewsProvider } from '../context/NewsContext'

import Home from './Pages/Home'
import Favorites from './Pages/Favorites'

import '../styles/global.css'
import '../styles/responsive.css'

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={ <NewsProvider> <Home /> </NewsProvider>} />
          <Route path='/favorites' element={ <Favorites/>} />
      </Routes>
    </Router>
  )
}

export default App
