require 'dotenv'

OpenAI.configure do |config|
    config.access_token = ENV["OPENAI_ACCESS_TOKEN"]
    config.request_timeout = ENV["REQUEST_TIMEOUT"].to_i
end