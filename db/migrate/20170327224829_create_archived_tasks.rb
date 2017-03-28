class CreateArchivedTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :archived_tasks do |t|
      t.string :title
      t.references :archived_by, foreign_key: true
      t.references :board, foreign_key: true
      t.references :list, foreign_key: true

      t.timestamps
    end
  end
end
