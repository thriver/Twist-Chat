import { gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatroomPreview from '../components/Chatroom/ChatroomPreview'
import CreateChatroomModal from '../components/Chatroom/CreateChatroomModal'
import BaseButton from '../components/Shared/BaseButton'
import Loading from '../components/Shared/Loading'
import { useUserState } from '../contexts/UserState'
import { usegetChatroomsQuery } from '../generated/graphql'

gql`
  query getChatrooms {
    chatrooms {
      ...ChatroomPreview
    }
  }
`

const Chatrooms: React.FC = () => {
  const [isCreateChatroomModalOpen, setIsCreateChatroomModalOpen] =
    useState<boolean>(false)
  const { data, loading } = usegetChatroomsQuery({
    pollInterval: 5000
  })
  const { state, setState } = useUserState()
  const navigate = useNavigate()

  const listChatrooms = () => {
    return data?.chatrooms.map((chatroom) => {
      return <ChatroomPreview key={chatroom.id} chatroom={chatroom} />
    })
  }

  useEffect(() => {
    if (state.username === undefined || state.username === null)
      navigate('/login')
  })

  if (loading) return <Loading />

  return (
    <>
      <CreateChatroomModal
        isOpen={isCreateChatroomModalOpen}
        setIsOpen={setIsCreateChatroomModalOpen}
      />
      <div className="flex flex-col justify-start text-center h-screen gap-y-10">
        <h1 className="text-2xl group transform">
          <span className="group-hover:text-blue-900 group-hover:-scale-y-100 transform inline-block transition duration-500 mt-10">
            Twist
          </span>{' '}
          Chatrooms
        </h1>
        <p>Welcome user: {state.username}!</p>
        <div>
          <BaseButton
            text="Logout"
            onClick={() => setState({ username: undefined })}
          />
        </div>

        <div>
          <BaseButton
            text="Create a Chatroom"
            onClick={() => setIsCreateChatroomModalOpen(true)}
          />
        </div>
        <div className="flex flex-col gap-5 items-center pb-5">
          {listChatrooms()}
        </div>
      </div>
    </>
  )
}

export default Chatrooms
