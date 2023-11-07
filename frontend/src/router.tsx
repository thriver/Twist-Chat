import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import Chatrooms from './pages/Chatrooms'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/chatrooms',
    element: <Chatrooms />
  }
])

export default router
