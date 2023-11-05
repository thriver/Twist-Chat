class Mutations::CreateChatroom < Mutations::BaseMutation
  description "Create a chatroom and return its ID. No chatroom can have the same name and owner."

  argument :username, String, required: true,
           description: "Username of user who created the chatroom"
  argument :prompt, String, required: true,
           description: "Prompt for chatroom. Leave blank/whitespace if no twist"
  argument :name, String, required: true, description: "Chatroom name"

  field :errors, [Types::CreateChatroomError], null: true
  field :chatroom_id, ID, null: true

  def resolve(username:, prompt:, name:)
    user = User.find_by(:username => username)
    does_chatroom_exist = Chatroom.where(:user_id => user ? user.id : -1).where(:name => name).count > 0

    errors = []
    if name.strip.eql? ""
      errors.append(ArgumentError.new("Chatroom must have a non-blank name."))
    elsif does_chatroom_exist
      errors.append(ArgumentError.new("Chatroom with owner, #{user.username} and name #{name} already exists."))
    end

    if user == nil
      errors.append(ArgumentError.new("User, #{username} does not exist"))
    end
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

    chatroom = Chatroom.new(user: user, name: name, prompt: prompt.strip)
    if chatroom.save
      {"chatroom_id" => chatroom.id}
    else
      {
        "errors" =>
          chatroom.errors.map do |error|
            path = ["attributes", error.attribute.to_s.camelize(:lower)]
            {
              path: path,
              message: error.message,
            }
          end
      }
    end
  end
end