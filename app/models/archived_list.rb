class ArchivedList < ApplicationRecord
  belongs_to :board
  belongs_to :archived_by, :class_name => 'User'
  has_many :tasks
  has_many :archived_task
  validates :title, presence: true
  validates :original_id, presence: true
end
