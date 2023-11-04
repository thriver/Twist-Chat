module Types
  class MutationType < Types::BaseObject
    field :login, mutation: Mutations::LoginUser
    field :postMessage, mutation: Mutations::PostMessage
  end
end