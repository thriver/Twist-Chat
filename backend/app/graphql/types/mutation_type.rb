# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :login, mutation: Mutations::LoginUser
    field :postMessage, mutation: Mutations::PostMessage
    field :createChatroom, mutation: Mutations::CreateChatroom
  end
end
