import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'

import '../styles/global.css'
import '../styles/responsive.css'

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
