# frozen_string_literal: true

class Mutations::LoginUser < Mutations::BaseMutation
  description 'Login as a user'

  argument :username, String, required: true, description: 'Username to log in'

  field :user, Types::LoginResponseType, null: true, description: 'Return user who logged in'
  field :errors, [Types::LoginError], null: true

  def resolve(username:)
    if User.exists?(username: username)
      {
        user:   User.find_by(username: username),
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
        errors = user.errors.map do |error|
          {
            path: ['attributes', error.attribute.to_s.camelize(:lower)],
            message: error.message
          }
        end
        {
          user:   nil,
          errors: errors
        }
      end
    end
  end
end
