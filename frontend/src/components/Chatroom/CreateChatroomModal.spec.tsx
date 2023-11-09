import { render, fireEvent, act } from '@testing-library/react'
import CreateChatroomModal from './CreateChatroomModal'
import { UserStateContext } from '../../contexts/UserState'
import { MockedProvider, wait } from '@apollo/client/testing'
import { createChatroomDocument } from '../../generated/graphql'

const mocks = [
  {
    request: {
      query: createChatroomDocument,
      variables: {
        prompt: 'prompt',
        name: 'promptChat',
        username: 'user1'
      }
    },
    result: {
      data: {
        createChatroom: { errors: null }
      }
    }
  },
  {
    request: {
      query: createChatroomDocument,
      variables: {
        prompt: 'error',
        name: 'error',
        username: 'user1'
      }
    },
    result: {
      data: {
        createChatroom: {
          errors: [
            {
              message: 'ErrorMessage'
            }
          ]
        }
      }
    }
  },
  {
    request: {
      query: createChatroomDocument,
      variables: {
        prompt: '',
        name: 'noPromptChat',
        username: 'user1'
      }
    },
    result: {
      data: {
        createChatroom: { errors: null }
      }
    }
  }
]

const props = { isOpen: true, setIsOpen: jest.fn() }

describe('CreateChatroomModal', () => {
  const mockSetState = jest.fn()
  const getRender = () => {
    return render(
      <UserStateContext.Provider
        value={{ state: { username: 'user1' }, setState: mockSetState }}
      >
        <MockedProvider mocks={mocks}>
          <CreateChatroomModal {...props} />
        </MockedProvider>
      </UserStateContext.Provider>
    )
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('Should correctly render the form', () => {
    const { getByText } = getRender()
    expect(getByText('Chatroom Name:')).toBeTruthy()
    expect(getByText('Chatroom Twist (Optional):')).toBeTruthy()
    expect(getByText('Submit')).toBeTruthy()
    expect(getByText('Close')).toBeTruthy()
  })

  it('Should not allow submit if there is no chatroom name', () => {
    const { getByText } = getRender()

    fireEvent.click(getByText('Submit'))
    expect(props.setIsOpen).not.toHaveBeenCalled()
  })

  it('Should close the modal on pressing close button', () => {
    const { getByText } = getRender()

    fireEvent.click(getByText('Close'))
    expect(props.setIsOpen).toHaveBeenCalledWith(false)
  })

  it('Should call the createChatroom mutation if there is a name', async () => {
    const { getByText, getByTestId } = getRender()

    fireEvent.change(getByTestId('name-input'), {
      target: { value: 'noPromptChat' }
    })
    fireEvent.click(getByText('Submit'))
    await act(async () => await wait(0))
    expect(props.setIsOpen).toHaveBeenCalledWith(false)
  })

  it('Should call the createChatroom mutation if there is a name and twist', async () => {
    const { getByText, getByTestId } = getRender()

    fireEvent.change(getByTestId('name-input'), {
      target: { value: 'promptChat' }
    })
    fireEvent.change(getByTestId('twist-input'), {
      target: { value: 'prompt' }
    })
    fireEvent.click(getByText('Submit'))
    await act(async () => await wait(0))
    expect(props.setIsOpen).toHaveBeenCalledWith(false)
  })

  it('Should call window.alert if the mutation throws an error', async () => {
    const { getByText, getByTestId } = getRender()
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => null)
    fireEvent.change(getByTestId('name-input'), {
      target: { value: 'error' }
    })
    fireEvent.change(getByTestId('twist-input'), {
      target: { value: 'error' }
    })
    fireEvent.click(getByText('Submit'))
    await act(async () => await wait(0))
    expect(props.setIsOpen).not.toHaveBeenCalledWith(false)
    expect(alert).toHaveBeenCalledWith('ErrorMessage')
  })
})
