# frozen_string_literal: true

class CreateChatrooms < ActiveRecord::Migration[7.1]
  def change
    create_table :chatrooms do |t|
      t.references :user, null: false, foreign_key: true
      t.string :prompt
      t.string :name

      t.timestamps
    end
  end
end
