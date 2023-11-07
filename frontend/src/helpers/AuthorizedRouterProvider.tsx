import { RouterProvider } from 'react-router-dom'
import AuthorizedRouter from '../AuthorizedRouter'
import { useUserState } from '../contexts/UserState'
import UnauthorizedRouter from '../UnauthorizedRouter'

const AuthorizedRouterProvider: React.FC = () => {
  const { state } = useUserState()

  return state.username !== undefined ? (
    <RouterProvider router={AuthorizedRouter} />
  ) : (
    <RouterProvider router={UnauthorizedRouter} />
  )
}

export default AuthorizedRouterProvider
