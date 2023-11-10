# frozen_string_literal: true

class CreateUserMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :user_messages do |t|
      t.references :user, null: false, foreign_key: true
      t.references :chatroom, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
