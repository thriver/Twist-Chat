class CreateTwistMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :twist_messages do |t|
      t.references :user_messages, null: false, foreign_key: true
      t.string :message

      t.timestamps
    end
  end
end
