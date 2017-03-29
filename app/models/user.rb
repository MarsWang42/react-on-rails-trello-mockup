class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # validate the presence of username
  validates_presence_of :username
  validates_uniqueness_of :username
  has_and_belongs_to_many :boards
  has_many :lists
  has_many :assigned_tasks, :class_name => 'Task', :foreign_key => 'assignee_id'
  has_many :created_tasks, :class_name => 'Task', :foreign_key => 'creator_id'
  has_many :archived_tasks, :class_name => 'ArchivedTask', :foreign_key => 'archived_by'
  has_many :archived_lists, :class_name => 'ArchivedList', :foreign_key => 'archived_by'
end
