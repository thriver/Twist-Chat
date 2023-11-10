import { gql } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { ChatroomPreviewFragment } from '../../generated/graphql'

gql`
  fragment ChatroomPreview on Chatroom {
    id
    name
    user {
      username
    }
  }
`

interface ChatroomPreviewProps extends React.HTMLAttributes<HTMLLinkElement> {
  chatroom: ChatroomPreviewFragment
}

const ChatroomPreview: React.FC<ChatroomPreviewProps> = (props) => {
  return (
    <Link
      to={`/chatrooms/${props.chatroom.id}`}
      className="bg-blue-200 shadow-sm rounded-md w-96 h-20 flex flex-col align-middle justify-between hover:bg-blue-400 py-1 px-2"
    >
      <p className="text-lg">{props.chatroom.name}</p>
      <div className="h-8 flex flex-row justify-start">
        <p className="text-sm">Created by {props.chatroom.username}</p>
      </div>
    </Link>
  )
}

export default ChatroomPreview
