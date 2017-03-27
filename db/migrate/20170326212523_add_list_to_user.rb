class AddListToUser < ActiveRecord::Migration[5.0]
  def change
    add_reference :users, :lists, foreign_key: true
  end
end
