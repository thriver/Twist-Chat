module Types
  class MutationType < Types::BaseObject
    field :login, mutation: Mutations::LoginUser
  end
end