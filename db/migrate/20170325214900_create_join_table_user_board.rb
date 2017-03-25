class CreateJoinTableUserBoard < ActiveRecord::Migration[5.0]
  def change
    create_join_table :users, :boards do |t|
      # t.index [:user_id, :board_id]
      # t.index [:board_id, :user_id]
    end
  end
end
