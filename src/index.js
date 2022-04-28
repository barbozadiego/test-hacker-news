import { StrictMode } from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { NewsProvider } from './context/NewsContext'


render(
  <StrictMode>
     <NewsProvider>
        <App />
     </NewsProvider>
  </StrictMode>,
  document.getElementById('root')
)


