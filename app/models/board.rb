class Board < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :lists
  validates :title, presence: true
end
