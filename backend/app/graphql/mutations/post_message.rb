# frozen_string_literal: true

class Mutations::PostMessage < Mutations::BaseMutation
  description 'Post a message as a user to a chatroom'

  argument :username, String, required: true, as: :user, 
           description: 'Username of user who posted the message', prepare: -> (username, _ctx) do
    User.find_by(username: username)
  end
  argument :chatroom, ID, required: true, as: :chatroom_record, description: 'Chatroom ID message is posted in', prepare: -> (id, _ctx) do
    Chatroom.find(id)
  end
  argument :content, String, required: true, description: 'Message content'

  field :errors, [Types::PostMessageError], null: true
  field :user_message, Types::UserMessageType, null: false

  def resolve(user:, chatroom_record:, content:)
    user_message = UserMessage.create(user: user, chatroom: chatroom_record, content: content)
    { user_message: user_message, errors: [] }
  end
end
