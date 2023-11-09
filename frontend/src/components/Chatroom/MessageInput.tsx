import { gql, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import BaseInput from '../Shared/BaseInput'
import BaseButton from '../Shared/BaseButton'
import { useUserState } from '../../contexts/UserState'
import { useParams } from 'react-router-dom'

const POST_MESSAGE = gql`
  mutation postMessage($username: String!, $chatroom: ID!, $content: String!) {
    postMessage(
      input: { username: $username, chatroom: $chatroom, content: $content }
    ) {
      errors {
        message
      }
    }
  }
`

const MessageInput: React.FC = () => {
  const [postMessage, { data, reset }] = useMutation(POST_MESSAGE)
  const { state } = useUserState()
  const { chatroomId } = useParams()
  const [currentMessage, setCurrentMessage] = useState<string | null>(null)

  useEffect(() => {
    if (data) {
      if (data?.postMessage?.errors) {
        window.alert(data.postMessage.errors[0].message)
      }
      reset()
    }
  }, [data, reset])

  const handlePostMessage = () => {
    postMessage({
      variables: {
        username: state.username,
        chatroom: chatroomId,
        content: currentMessage
      }
    })
    setCurrentMessage('')
  }

  return (
    <div className="flex flex-row w-96 justify-center space-x-10">
      <BaseInput
        label="Write a Message:"
        name="message-input"
        data-testid="message-input"
        placeholder="Your Message"
        onChange={(e) => setCurrentMessage(e.target.value)}
        value={currentMessage ?? ''}
        onKeyDown={(e) => {
          e.code === 'Enter' ? handlePostMessage() : null
        }}
      />
      <div className="mt-6">
        <BaseButton
          onClick={handlePostMessage}
          text="Send"
          disabled={!(currentMessage && currentMessage.length > 0)}
        />
      </div>
    </div>
  )
}

export default MessageInput
