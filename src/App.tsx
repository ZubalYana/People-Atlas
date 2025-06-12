import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './components/AuthComponents/Auth'
import NetworkPage from './components/Pages/NetworkPage/NetworkPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <NetworkPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
