class CreateTwistMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :twist_messages do |t|
      t.references :user_message, null: false, foreign_key: true
      t.string :message

      t.timestamps
    end
  end
end
