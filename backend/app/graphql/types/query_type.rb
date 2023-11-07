# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject

    field :chatrooms, [Types::ChatroomType], null: false,
          description: "Return all chatrooms in chronological order"
    def chatrooms
      Chatroom.all.order(:created_at).joins(:user).select("Chatrooms.*, users.username")
    end

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
