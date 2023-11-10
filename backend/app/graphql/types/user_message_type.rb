# frozen_string_literal: true

module Types
  class UserMessageType < Types::BaseObject
    field :id, ID, null: false
    field :user_id, ID, null: false
    field :username, String, null: false
    field :chatroom_id, ID, null: false
    field :content, String
    field :twist_message, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
