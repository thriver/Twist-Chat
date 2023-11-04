# frozen_string_literal: true

module Types
  class LoginError < Types::BaseObject
    description "Error on attempt to log in"

    field :message, String, null:false,
          description: "Error message"
    field :path, [String], null: false,
          description:  "Which input value this error came from"
  end
end
