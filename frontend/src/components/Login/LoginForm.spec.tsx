import { act, fireEvent, render } from '@testing-library/react'
import LoginForm from './LoginForm'
import { UserStateContext } from '../../contexts/UserState'
import { MockedProvider, wait } from '@apollo/client/testing'
import { LoginDocument } from '../../generated/graphql'
import * as reactRouter from 'react-router-dom'

jest.mock('react-router-dom')

const mocks = [
  {
    request: {
      query: LoginDocument,
      variables: {
        username: 'user1'
      }
    },
    result: {
      data: {
        login: {
          user: {
            username: 'user1'
          },
          errors: null
        }
      }
    }
  },
  {
    request: {
      query: LoginDocument,
      variables: {
        username: 'badUser'
      }
    },
    result: {
      data: {
        login: {
          user: {
            username: null
          },
          errors: [{ message: 'ErrorMessage' }]
        }
      }
    }
  }
]
describe('LoginForm', () => {
  const mockSetState = jest.fn()
  const state = { username: undefined }
  const getRender = () => {
    return render(
      <UserStateContext.Provider
        value={{ state: state, setState: mockSetState }}
      >
        <MockedProvider mocks={mocks}>
          <LoginForm />
        </MockedProvider>
      </UserStateContext.Provider>
    )
  }

  it('Should log the user in', async () => {
    const mockNavigate = jest.fn()
    jest.spyOn(reactRouter, 'useNavigate').mockReturnValue(mockNavigate)
    const { getByTestId } = getRender()
    fireEvent.change(getByTestId('user-input'), { target: { value: 'user1' } })
    fireEvent.submit(getByTestId('login-form'))
    await act(async () => await wait(0))

    expect(mockSetState).toHaveBeenCalledWith({ username: 'user1' })
    expect(mockNavigate).toHaveBeenCalledWith('/chatrooms')
  })

  it('Should handle errors', async () => {
    const mockNavigate = jest.fn()
    jest.spyOn(reactRouter, 'useNavigate').mockReturnValue(mockNavigate)

    const alert = jest.spyOn(window, 'alert').mockImplementation(() => null)

    const { getByTestId } = getRender()
    fireEvent.change(getByTestId('user-input'), {
      target: { value: 'badUser' }
    })
    fireEvent.submit(getByTestId('login-form'))
    await act(async () => await wait(0))

    expect(mockSetState).not.toHaveBeenCalledWith({ username: 'badUser' })
    expect(mockNavigate).not.toHaveBeenCalledWith('/chatrooms')
    expect(alert).toHaveBeenCalledWith(
      'There was an issue logging in. Please try again later.'
    )
  })
})
