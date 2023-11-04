class Mutations::LoginUser < Mutations::BaseMutation
  argument :username, String, required: true, description: "Username to log in"

  field :user, Types::LoginResponseType, null: false, description: "Return user who logged in"
  field :errors, [String], null: true

  def resolve(username:)
    if User.exists?(:username => username)
      {
        user: User.find_by(:username => username),
        errors: []
      }
    else
      user = User.new(username: username)
      if user.save
        {
          user: user,
          errors: []
        }
      else
        {
          user: nil,
          errors: user.errors.full_messages
        }
      end
    end
  end
end