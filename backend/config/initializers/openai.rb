OpenAI.configure do |config|
    config.access_token = Rails.application.credentials.openai.api_key
    config.request_timeout = Rails.application.credentials.openai.request_timeout
end