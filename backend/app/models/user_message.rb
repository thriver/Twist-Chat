class UserMessage < ApplicationRecord
  belongs_to :user, dependent: :destroy
  belongs_to :chatroom, dependent: :destroy

  def twist_message
    openAIService = OpenAIService.new
    twisted_message = openAIService.twist_message(self.content, self.chatroom.prompt)

    new_message = TwistMessage.new(user_message: self, message: twisted_message)
    UserMessage.reset_column_information
    if new_message.save
      nil
    else
      {"errors" =>
        new_message.errors.map do |error|
          path = ["attributes", error.attribute.to_s.camelize(:lower)]
          {
            path: path,
            message: error.message
          }
        end
        }
    end
  end
end
