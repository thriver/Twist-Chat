# frozen_string_literal: true

module Types
  class ChatroomType < Types::BaseObject
    field :id, ID, null: false    
    field :username, String, null:false
    field :prompt, String
    field :name, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :user, Types::UserType, null: false
  end
end
