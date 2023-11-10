# == Schema Information
#
# Table name: user_messages
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  chatroom_id :integer          not null
#  content     :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
RSpec.describe UserMessage do
  let(:user) {User.new(username: "username")}
  let(:chatroom) {Chatroom.new(user: user, name: "name", prompt: "prompt")}
  let(:message) {UserMessage.new(user: user, chatroom: chatroom, content: "content")}

  it "should create a twist message and call openAI when requested" do
    allow_any_instance_of(OpenAIService).to receive(:twist_message) do
      "twisted message"
    end

    result = message.twist_message
    expect(result).to eq nil
    expect(TwistMessage.where(:message => "twisted message").count).to be(1)
  end

  it "should handle errors" do
    allow_any_instance_of(OpenAIService).to receive(:twist_message) do
      "twisted message"
    end

    allow_any_instance_of(TwistMessage).to receive(:save) do |message|
      message.errors.add("path", "FakeError")
      false
    end

    result = message.twist_message
    expect(result["errors"][0]).to eq({:message => "FakeError", :path => %w[attributes path]})
    expect(TwistMessage.where(:message => "twisted message").count).to be(0)
  end

end
