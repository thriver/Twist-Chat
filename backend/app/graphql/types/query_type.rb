# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject

    field :chatrooms, resolver: Queries::ChatroomQuery

    field :chatroom_messages,
          [Types::UserMessageType], null: false,
          description: "Return all messages for a chatroom in chronological order"do
      argument :id, ID, required: true
    end
    def chatroom_messages(id:)
      chatroom = Chatroom.find(id)
      chatroom.get_messages
    end
  end
end
