# frozen_string_literal: true

class Queries::ChatroomQuery < Queries::BaseQuery
  description 'Return all chatrooms in chronological order'

  type [Types::ChatroomType], null: false

  def resolve
    Chatroom.order(:created_at)
  end
end
