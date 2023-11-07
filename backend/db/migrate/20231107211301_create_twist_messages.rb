class CreateTwistMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :twist_messages do |t|
      t.string :message
      t.references :usermessage, null: false, foreign_key: true

      t.timestamps
    end
  end
end
