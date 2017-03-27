class List < ApplicationRecord
  belongs_to :board
  belongs_to :user
  has_many :tasks
end
