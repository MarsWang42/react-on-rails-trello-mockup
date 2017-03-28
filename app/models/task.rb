class Task < ApplicationRecord
  belongs_to :list
  belongs_to :board
  belongs_to :assignee, :class_name => 'User', optional: true
  belongs_to :creator, :class_name => 'User'
  validates :title, presence: true
end
