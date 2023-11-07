class Chatroom < ApplicationRecord
  belongs_to :user

  def get_messages
    relevant_user_messages = UserMessage.all.where(:chatroom_id => self.id)
                                        .order("user_messages.created_at DESC").joins(:user)
                                        .select("user_messages.*, users.username")
    if self.prompt == nil or self.prompt.strip.equal? ""
      relevant_user_messages
    else
      relevant_user_messages.joins("INNER JOIN twist_messages ON twist_messages.user_message_id=user_messages.id")
                            .select(
                              "twist_messages.*, twist_messages.message as 'content',
                                        users.username, user_messages.chatroom_id")
    end
  end
end
