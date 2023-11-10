# frozen_string_literal: true

# == Schema Information
#
# Table name: user_messages
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  chatroom_id   :integer          not null
#  content       :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  twist_message :string
#
class UserMessage < ApplicationRecord
  belongs_to :user, dependent: :destroy
  belongs_to :chatroom, dependent: :destroy

  before_create :twist_content

  def twist_content
    return unless chatroom.prompt.present?

    self.twist_message = OpenAIService.new.twist_message(content, chatroom.prompt) 
  end
end
