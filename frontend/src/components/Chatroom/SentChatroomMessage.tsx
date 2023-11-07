import { gql } from '@apollo/client'
import React from 'react'
import { SentChatroomMessageFragment } from '../../generated/graphql'

gql`
  fragment SentChatroomMessage on UserMessage {
    content
    username
    createdAt
  }
`

interface SentChatroomMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message: SentChatroomMessageFragment
}

const SentChatroomMessage: React.FC<SentChatroomMessageProps> = (props) => {
  return (
    <div className="w-full flex justify-end">
      <div className="justify-items-end flex-row w-96">
        <div className="ml-auto flex flex-col px-2">
          <p className="text-sm text-right font-bold">
            {props.message.username}
          </p>
          <div>
            <p className="flex flex-col box-border rounded-lg text-base text-left bg-gray-200 p-4 min-w-fit max-w-md whitespace-break-spaces">
              {props.message.content}
            </p>
          </div>
          <p className="text-left text-sm">
            {props.message.createdAt.substring(0, 10)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SentChatroomMessage
