import { gql } from '@apollo/client'
import React from 'react'
import { ReceivedChatroomMessageFragment } from '../../generated/graphql'

gql`
  fragment ReceivedChatroomMessage on UserMessage {
    content
    username
    createdAt
  }
`

interface ReceivedChatroomMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message: ReceivedChatroomMessageFragment
}

const ReceivedChatroomMessage: React.FC<ReceivedChatroomMessageProps> = (
  props
) => {
  return (
    <div className="w-full flex justify-start">
      <div className="justify-items-end flex-row w-96">
        <div className="ml-auto flex flex-col px-2">
          <p className="text-sm text-left font-bold">
            {props.message.username}
          </p>
          <div>
            <p className="flex flex-col box-border rounded-lg text-base text-left bg-blue-200 p-4 min-w-fit max-w-md whitespace-break-spaces">
              {props.message.content}
            </p>
          </div>
          <p className="text-right text-sm">
            {props.message.createdAt.substring(0, 10)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReceivedChatroomMessage
