# frozen_string_literal: true

module Types
  class CreateChatroomError < Types::BaseObject
    description 'Error on attempt to create a chatroom'

    field :message, String, null:        false,
                            description: 'Error message'
    field :path, [String], null:        true,
                           description: 'Which input value this error came from'
  end
end
