import React, { useEffect, useState } from 'react'
import BaseInput from '../Shared/BaseInput'
import BaseButton from '../Shared/BaseButton'
import { gql, useMutation } from '@apollo/client'
import { useUserState } from '../../contexts/UserState'

const CREATE_CHATROOM = gql`
  mutation createChatroom(
    $username: String!
    $prompt: String!
    $name: String!
  ) {
    createChatroom(
      input: { username: $username, prompt: $prompt, name: $name }
    ) {
      chatroomId
      errors {
        message
      }
    }
  }
`
interface CreateChatroomModalProps {
  isOpen: boolean
  setIsOpen: (input: boolean) => void
}

const CreateChatroomModal: React.FC<CreateChatroomModalProps> = (props) => {
  const [chatroomName, setChatroomName] = useState<string>()
  const [twist, setTwist] = useState<string>()
  const { state } = useUserState()
  const [createChatroom, { data }] = useMutation(CREATE_CHATROOM)

  useEffect(() => {
    if (data) {
      if (data.errors) {
        window.alert('Something went wrong, please try again')
      } else {
        props.setIsOpen(false)
      }
    }
  }, [data, props])

  const handleSubmit = () => {
    createChatroom({
      variables: {
        prompt: twist ?? '',
        name: chatroomName,
        username: state.username
      }
    })
  }

  return (
    <dialog
      open={props.isOpen}
      onSubmit={handleSubmit}
      className="mt-20 z-20 my-auto min-w-[40%] mx-auto align-middle rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
    >
      <div className="flex flex-col gap-y-5 px-10 justify-center">
        <h2 className="text-lg font-bold text-center">Create a Chatroom</h2>
        <form className="flex flex-col gap-y-5">
          <BaseInput
            label="Chatroom Name:"
            name="name"
            onChange={(e) => setChatroomName(e.target.value)}
          />
          <BaseInput
            label="Chatroom Twist (Optional):"
            name="twist"
            onChange={(e) => setTwist(e.target.value)}
          />
          <BaseButton
            disabled={
              chatroomName === null ||
              chatroomName === undefined ||
              chatroomName.length === 0
            }
            text="Submit"
          />
        </form>
        <footer className="flex justify-center my-2">
          <BaseButton onClick={() => props.setIsOpen(false)} text="Close" />
        </footer>
      </div>
    </dialog>
  )
}

export default CreateChatroomModal
