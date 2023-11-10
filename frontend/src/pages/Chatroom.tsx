import { gql } from '@apollo/client'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MessageInput from '../components/Chatroom/MessageInput'
import ReceivedChatroomMessage from '../components/Chatroom/ReceivedChatroomMessage'
import SentChatroomMessage from '../components/Chatroom/SentChatroomMessage'
import BaseButton from '../components/Shared/BaseButton'
import Loading from '../components/Shared/Loading'
import { useUserState } from '../contexts/UserState'
import { usegetChatroomMessagesQuery } from '../generated/graphql'

gql`
  query getChatroomMessages($id: ID!) {
    chatroomMessages(id: $id) {
      id
      ...ReceivedChatroomMessage
      ...SentChatroomMessage
    }
  }
`

const Chatroom: React.FC = () => {
  const { state } = useUserState()
  const navigate = useNavigate()

  const { chatroomId } = useParams()

  useEffect(() => {
    if (state.username === undefined || state.username === null)
      navigate('/login')
  })

  if (!chatroomId) {
    return <Loading />
  }

  const { data, loading } = usegetChatroomMessagesQuery({
    variables: {
      id: chatroomId
    },
    pollInterval: 5000
  })

  const listMessages = () => {
    return data?.chatroomMessages.map((message) => {
      if (message.username === state.username) {
        return <SentChatroomMessage message={message} key={message.id} />
      } else {
        return <ReceivedChatroomMessage message={message} key={message.id} />
      }
    })
  }

  if (loading) return <Loading />

  return (
    <div className="flex flex-col justify-start text-center h-screen gap-y-10 px-20">
      <h1 className="text-2xl group transform">
        <span className="group-hover:text-blue-900 group-hover:-scale-y-100 transform inline-block transition duration-500 mt-10">
          Messages
        </span>
      </h1>
      <Link to="/chatrooms">
        <BaseButton text="Back to chatrooms" />
      </Link>
      <div className="flex flex-col-reverse gap-5 items-center h-3/4 overflow-scroll">
        {listMessages()}
      </div>
      <div className="w-screen flex justify-center pb-5">
        <MessageInput />
      </div>
    </div>
  )
}

export default Chatroom
