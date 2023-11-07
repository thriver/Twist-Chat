import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import Chatrooms from './pages/ChatroomsList'
import Chatroom from './pages/Chatroom'

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
  },
  {
    path: '/chatrooms/:chatroomId',
    element: <Chatroom />
  }
])

export default router
