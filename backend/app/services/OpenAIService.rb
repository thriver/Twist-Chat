class OpenAIService
  @client

  def initialize
    super
    @client = OpenAI::Client.new
  end

  def twist_message(message, twist)
    response = @client.chat(
      parameters: {
        model: "gpt-3.5-turbo",
        messages: [
          {role: "user",
           content: "Change the message '#{message}' to fit the theme: #{twist}.
            Use at most #{message.length} words. Do not wrap the message in quotes."}
        ]
      }
    )
    response.dig("choices", 0, "message", "content")
  end
end