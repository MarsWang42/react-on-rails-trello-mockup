class Board < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :lists
  has_many :tasks
  has_many :archived_tasks
  has_many :archived_lists
  validates :title, presence: true
end
