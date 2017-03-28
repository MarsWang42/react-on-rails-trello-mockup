class ArchivedTask < ApplicationRecord
  belongs_to :list
  belongs_to :board
  belongs_to :archived_by, :class_name => 'User'
  validates :title, presence: true
end
