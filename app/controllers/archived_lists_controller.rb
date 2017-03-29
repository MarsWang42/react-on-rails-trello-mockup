class ArchivedListsController < ApplicationController
  skip_before_action :verify_authenticity_token
  include ActionView::Helpers::DateHelper

  def index
    respond_to :json, :html
    begin
      board = current_user.boards.find(params[:board_id])
      render :json => {
        :archivedLists => board.archived_tasks.map { |task| {
          :title => task.title,
          :id => task.id,
          :list => {
            :title => task.list.title,
            :id => task.list.id
          },
          :archivedBy => task.archived_by.username,
          :archivedAt => task.updated_at
        }}
      }, :status => 200
    rescue
      render :json => {
        :error => "Board cannot be found."
      }, :status => 404
    end
  end

  def show
    respond_to :json, :html
    begin
      board = current_user.boards.find(params[:id])
      render :json => {
        :title => board.title,
        :tasks => board.lists.map {|list| {
          :title => list.title,
          :tasks => list.tasks,
          :id => list.id,
        }}
      }, :status => 200
    rescue
      render :json => {
        :error => "List cannot be found."
      }, :status => 404
    end
  end

  def create
    respond_to :json, :html
    list = List.find(params[:id])
    user_boards = current_user.boards
    if (user_boards.include? list.board)
      archived_list = ArchivedList.new()
      archived_list.title = list.title
      archived_list.board = list.board
      archived_list.original_id = list.id
      archived_list.archived_by = current_user
      list.destroy
      if archived_list.save
        render :json => {
          :archivedList => {
            :originalId => archived_list.original_id
          }
        }, :status => 200
      else render :json => {
        :error => archived_list.errors
      }, :status => 404
      end
    end
  end

  private
    def list_params
      params.require(:list).permit(:title)
    end
end
