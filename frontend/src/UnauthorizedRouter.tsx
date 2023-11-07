import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'

const UnauthorizedRouter = createBrowserRouter([
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
    element: <LoginPage />
  },
  {
    path: '*',
    element: <HomePage />
  }
])

export default UnauthorizedRouter
