# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :username, String, null: false
  end
end
