import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './components/AuthComponents/Auth'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element="Hello" />
          <Route path='/auth' element={<Auth />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
