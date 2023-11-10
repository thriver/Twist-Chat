# == Schema Information
#
# Table name: twist_messages
#
#  id              :integer          not null, primary key
#  user_message_id :integer          not null
#  message         :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class TwistMessage < ApplicationRecord
  belongs_to :user_message
end
