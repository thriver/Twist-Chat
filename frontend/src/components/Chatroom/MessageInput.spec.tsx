import { act, fireEvent, render } from '@testing-library/react'
import { UserStateContext } from '../../contexts/UserState'
import { postMessageDocument } from '../../generated/graphql'
import MessageInput from './MessageInput'
import { MockedProvider, wait } from '@apollo/client/testing'
import * as apolloClient from '@apollo/client'

const mocks = [
  {
    request: {
      query: postMessageDocument,
      variables: {
        content: 'valid_message',
        username: 'user1'
      }
    },
    result: {
      data: {
        postMessage: { errors: null }
      }
    }
  },
  {
    request: {
      query: postMessageDocument,
      variables: {
        content: 'error_message',
        username: 'user1'
      }
    },
    result: {
      data: {
        postMessage: { errors: [{ message: 'ErrorMessage' }] }
      }
    }
  }
]

describe('MessageInput', () => {
  const getRender = () => {
    return render(
      <UserStateContext.Provider
        value={{ state: { username: 'user1' }, setState: () => null }}
      >
        <MockedProvider mocks={mocks}>
          <MessageInput />
        </MockedProvider>
      </UserStateContext.Provider>
    )
  }
  it('should call mutation on submit', async () => {
    const alert = jest.spyOn(window, 'alert')
    const mockMutation = jest.spyOn(apolloClient, 'useMutation')
    const { getByRole, getByTestId } = getRender()
    fireEvent.change(getByTestId('message-input'), {
      target: { value: 'valid_message' }
    })
    fireEvent.click(getByRole('button'))
    await act(async () => await wait(0))
    expect(mockMutation).toHaveBeenCalled()
    expect(alert).not.toHaveBeenCalled()
  })

  it('should display the errors', async () => {
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => null)
    const { getByRole, getByTestId } = getRender()
    fireEvent.change(getByTestId('message-input'), {
      target: { value: 'error_message' }
    })
    fireEvent.click(getByRole('button'))
    await act(async () => await wait(0))
    expect(alert).toHaveBeenCalledWith('ErrorMessage')
  })
})
