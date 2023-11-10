# frozen_string_literal: true

class Types::ValidationErrorType < Types::BaseObject
  AttributeErrors = Struct.new(:attribute, :errors)

  field :attribute, String, null: false
  field :messages, [String], null: false do
    argument :long, Boolean, required: false, default_value: false do
      description 'Determines whether the `attribute` name should be included as part of the message.'
    end
  end

  # @param errors [ActiveModel::Errors]
  # @return [Array<AttributeErrors>]
  def self.wrap(errors)
    case errors
    in Array if errors.all?(AttributeErrors)
      errors
    in ActiveModel::Errors
      errors.attribute_names.map { |attribute_name| AttributeErrors.new(attribute_name, errors) }
    else
      raise ArgumentError, "Expected #{errors.inspect} to be an ActiveModel::Errors or Array of AttributeErrors"
    end
  end

  # @return [String]
  def attribute
    attribute = object.attribute.to_s
    attribute = attribute.gsub(/\Abase\.?/, '')
    attribute = attribute.chomp('.base') # e.g. `members[0].base` => `members[0]`

    attribute.camelize(:lower)
  end

  # @param long [Boolean]
  # @return [Array<String>]
  def messages(long:)
    long ? object.errors.full_messages_for(object.attribute) : object.errors.messages[object.attribute]
  end
end
