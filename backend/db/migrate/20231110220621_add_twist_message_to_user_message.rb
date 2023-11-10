# frozen_string_literal: true

class AddTwistMessageToUserMessage < ActiveRecord::Migration[7.1]
  def change
    add_column :user_messages, :twist_message, :string
    drop_table :twist_messages
  end
end
