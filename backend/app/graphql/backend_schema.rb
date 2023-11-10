# frozen_string_literal: true

class BackendSchema < BaseSchema
  mutation(Types::MutationType)
  query(Types::QueryType)
end
