import './App.css'
import { useEffect } from 'react';
import { useAuthStore } from './stores/useAuthStore'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './components/AuthComponents/Auth'
import NetworkPage from './components/Pages/NetworkPage/NetworkPage'
import ProfilePage from './components/Pages/ProfilePage/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  const restoreAuth = useAuthStore((state) => state.restoreAuth);

  useEffect(() => {
    restoreAuth();
  }, []);
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
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
