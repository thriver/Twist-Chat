# frozen_string_literal: true

# == Schema Information
#
# Table name: chatrooms
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  prompt     :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Chatroom < ApplicationRecord
  belongs_to :user

  def get_messages
    relevant_user_messages = UserMessage.where(chatroom_id: id)
                                        .order('user_messages.created_at DESC').joins(:user)
                                        .select('user_messages.*, users.username')
    if prompt.nil? || prompt.strip.equal?('')
      relevant_user_messages
    else
      relevant_user_messages.joins('INNER JOIN twist_messages ON twist_messages.user_message_id=user_messages.id')
                            .select(
                              "twist_messages.*, twist_messages.message as 'content',
                                        users.username, user_messages.chatroom_id"
                            )
    end
  end
end
