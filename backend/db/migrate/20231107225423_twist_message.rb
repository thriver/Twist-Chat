class TwistMessage < ActiveRecord::Migration[7.1]
  def change

    drop_table :twist_messages
  end
end
