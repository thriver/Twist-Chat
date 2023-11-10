# frozen_string_literal: true

class BaseSchema < GraphQL::Schema
  rescue_from ActiveRecord::RecordNotFound do |error|
    raise GraphQL::ExecutionError.new("Couldn't find requested #{error.model}", extensions: { code: 'Not Found' })
  end

  rescue_from ActiveModel::ValidationError do |error|
    { errors: Types::ValidationErrorType.wrap(error.model.errors) }
  end

  rescue_from ActiveRecord::RecordInvalid, ActiveRecord::RecordNotSaved, ActiveRecord::RecordNotDestroyed do |error|
    { errors: Types::ValidationErrorType.wrap(error.record.errors) }
  end
end
