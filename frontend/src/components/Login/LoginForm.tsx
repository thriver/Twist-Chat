import BaseButton from '../Shared/BaseButton'
import BaseInput from '../Shared/BaseInput'
import { useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import Loading from '../Shared/Loading'
import { useUserState } from '../../contexts/UserState'

const LOGIN = gql`
  mutation Login($username: String!) {
    login(input: { username: $username }) {
      user {
        username
      }
      errors {
        message
      }
    }
  }
`

const LoginForm: React.FC = () => {
  const navHelper = useNavigate()
  const [usernameValue, setUsernameValue] = useState<string>()
  const [login, { data, loading, reset }] = useMutation(LOGIN)
  const { state, setState } = useUserState()

  useEffect(() => {
    if (data) {
      const errors = data.login.errors
      if (errors?.length > 0) {
        // Since there are no rules for usernames, if an error occurs the server is likely down
        // We will issue a generic error in this case
        window.alert('There was an issue logging in. Please try again later.')
        reset()
      } else {
        setState({ username: data.login.user.username })
        navHelper('/chatrooms')
      }
    }
  }, [data, navHelper, setState, state, reset])

  const handleLogin = async () => {
    await login({
      variables: {
        username: usernameValue ?? ''
      }
    })
  }

  if (loading) {
    return <Loading />
  } else if (state.username) {
    navHelper('/chatrooms')
  }

  return (
    <form
      className="flex flex-col justify-center text-center align-middle h-screen gap-y-10 content-center items-center"
      onSubmit={handleLogin}
      data-testid="login-form"
    >
      <h1 className="text-2xl">Please Input a Username:</h1>
      <div className="w-64">
        <BaseInput
          label="Username:"
          data-testid="user-input"
          name="username"
          onChange={(e) => setUsernameValue(e.target.value)}
        ></BaseInput>
      </div>
      <div>
        <BaseButton text="Confirm" type="submit" />
      </div>
    </form>
  )
}

export default LoginForm
