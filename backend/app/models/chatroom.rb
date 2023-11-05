class Chatroom < ApplicationRecord
  belongs_to :user

  def get_messages
    UserMessage.where(:chatroom_id => self.id).order(:created_at)
  end
end
