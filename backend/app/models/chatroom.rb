class Chatroom < ApplicationRecord
  belongs_to :user

  def get_messages
    UserMessage.where(:chatroom_id => self.id).order("user_messages.created_at DESC").joins(:user)
               .select("user_messages.*, users.username")
  end
end
