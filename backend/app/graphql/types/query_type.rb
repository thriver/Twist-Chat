# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject

    field :chatrooms, [Types::ChatroomType], null: false, description: "Return all chatrooms"
    def chatrooms
      Chatroom.all
    end

    field :chatroom_messages,
          [Types::UserMessageType], null: false, description: "Return all messages for a chatroom"do
      argument :id, ID, required: true
    end
    def chatroom_messages(id:)
      UserMessage.all.where(chatroom_id=id).order(:created_at)
    end
  end
end
