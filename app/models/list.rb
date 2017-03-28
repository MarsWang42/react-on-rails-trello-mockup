class List < ApplicationRecord
  belongs_to :board
  belongs_to :user
  has_many :tasks
  has_many :archived_tasks
  validates :title, presence: true
end
