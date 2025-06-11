import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './components/AuthComponents/Auth'
import NetworkPage from './components/Pages/NetworkPage/NetworkPage'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NetworkPage />} />
          <Route path='/auth' element={<Auth />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
