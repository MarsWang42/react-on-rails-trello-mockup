class AddBoardToUser < ActiveRecord::Migration[5.0]
  def change
    add_reference :users, :board, foreign_key: true
  end
end
