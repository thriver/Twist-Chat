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
RSpec.describe Chatroom do
  user = User.create(username: 'user')
  describe 'When it is not a twist chat' do
    let(:normal_chat) { Chatroom.new(user:, name: 'chatroom') }
    it 'should get 0 messages' do
      expect(normal_chat.get_messages).to eq []
    end

    it 'should get 1 messages' do
      message = UserMessage.create(chatroom: normal_chat, user:)
      normal_chat.reload
      expect(normal_chat.get_messages.length).to eq 1
      expect(normal_chat.get_messages.first.id).to eq(message.id)
    end

    it 'should get 2 messages ordered by time of creation (DESC)' do
      message = UserMessage.create(chatroom: normal_chat, user:)
      message2 = UserMessage.create(chatroom: normal_chat, user:)
      normal_chat.reload
      expect(normal_chat.get_messages.length).to eq 2
      expect(normal_chat.get_messages.first.id).to eq(message2.id)
      expect(normal_chat.get_messages.second.id).to eq(message.id)
    end
  end
  describe 'When it is a twist chat' do
    let(:twist_chat) { Chatroom.new(user:, name: 'chatroom', prompt: 'prompt') }

    it 'should get 0 messages' do
      expect(twist_chat.get_messages).to eq []
    end

    it 'should get 1 messages' do
      message = UserMessage.create(chatroom: twist_chat, user:)
      twistmessage = TwistMessage.create(user_message: message, message: 'content')
      twist_chat.reload
      expect(twist_chat.get_messages.length).to eq 1
      expect(twist_chat.get_messages.first.id).to eq(twistmessage.id)
      expect(twist_chat.get_messages.first.content).to eq(twistmessage.message)
    end

    it 'should get 2 messages ordered by time of creation (DESC)' do
      message = UserMessage.create(chatroom: twist_chat, user:)
      message2 = UserMessage.create(chatroom: twist_chat, user:)
      twistmessage = TwistMessage.create(user_message: message, message: 'content')
      twistmessage2 = TwistMessage.create(user_message: message2, message: 'content2')
      twist_chat.reload
      expect(twist_chat.get_messages.length).to eq 2
      expect(twist_chat.get_messages.first.id).to eq(twistmessage2.id)
      expect(twist_chat.get_messages.first.content).to eq(twistmessage2.message)
      expect(twist_chat.get_messages.second.id).to eq(twistmessage.id)
      expect(twist_chat.get_messages.second.content).to eq(twistmessage.message)
    end
  end
end
