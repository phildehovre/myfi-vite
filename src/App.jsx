import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from './utils/db'

import './App.css'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import DiscoverPage from './pages/DiscoverPage'
import WatchlistPage from './pages/WatchlistPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <QueryClientProvider>
        <Router>
          <Nav />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/discover' element={<DiscoverPage />} />
            <Route path='/watchlist' element={<WatchlistPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  )
}

export default App
