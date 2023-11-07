class Mutations::PostMessage < Mutations::BaseMutation
  description "Post a message as a user to a chatroom"

  argument :username, String, required: true, description: "Username of user who posted the message"
  argument :chatroom, ID, required: true, description: "Chatroom ID message is posted in"
  argument :content, String, required: true, description: "Message content"

  field :errors, [Types::PostMessageError], null: true

  def resolve(username:, chatroom:, content:)
    user = User.find_by(:username => username)
    chatroom_record = Chatroom.find_by(:id => chatroom)

    errors = is_message_valid(chatroom_record, user, username, chatroom)
    if errors.count > 0
      return {
        "errors" => errors.map do |error|
          path = ["attributes", error.class.to_s]
          {
            path: path,
            message: error.to_s
          }
        end
      }
    end

    message = UserMessage.new(user: user, chatroom: chatroom_record, content: content)
    if message.save
      twist_message(message, chatroom_record)
    else
      {
        "errors" =>
          message.errors.map do |error|
            path = ["attributes", error.attribute.to_s.camelize(:lower)]
            {
              path: path,
              message: error.message,
            }
          end
      }
    end
  end

  def is_message_valid(chatroom_record, user, username, chatroom)
    errors = []
    if chatroom_record == nil
      errors.append(ArgumentError.new("Chatroom with id, #{chatroom} does not exist"))
    end

    if user == nil
      errors.append(ArgumentError.new("User, #{username} does not exist"))
    end
    errors
  end

  def twist_message(message, chatroom)
    if chatroom.prompt == nil or chatroom.prompt.strip.equal?""
      nil
    else
      message.twist_message
    end
  end
end