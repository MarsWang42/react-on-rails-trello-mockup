class CreateArchivedLists < ActiveRecord::Migration[5.0]
  def change
    create_table :archived_lists do |t|
      t.string :title
      t.integer :original_id
      t.references :archived_by, foreign_key: true
      t.references :board, foreign_key: true
      t.references :task, foreign_key: true
      t.references :archived_task, foreign_key: true

      t.timestamps
    end
  end
end
