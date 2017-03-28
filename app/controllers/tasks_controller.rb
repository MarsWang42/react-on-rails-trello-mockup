class TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  include ActionView::Helpers::DateHelper

  def index
    respond_to :json, :html
    render :json => {
      :boards => current_user.boards.map {|board| {
      :title => board.title,
      :updatedAt => "#{distance_of_time_in_words_to_now(board.updated_at)} ago",
      :id => board.id
    }}}, :status => 200
  end

  def show
    respond_to :json, :html
    begin
      task = Task.find(params[:id])
      render :json => {
        :task => {
          :id => task.id,
          :title => task.title,
          :belongsTo => {
            :id => task.list.id,
            :title => task.list.title
          },
          :updatedAt => "#{distance_of_time_in_words_to_now(task.updated_at)} ago",
          :createdBy => task.creator.username
        }
      }, :status => 200
    rescue
      render :json => {
        :error => "Task cannot be found."
      }, :status => 404
    end
  end

  def create
    respond_to :json, :html
    task = Task.new(task_params)
    list = List.find(params[:list_id])
    task.list = list
    task.board = list.board
    task.creator = current_user
    # make sure list and board are recoreded
    list.board.touch
    list.touch
    if task.save
      render :json => {
        :task => task
      }, :status => 200
    else render :json => {
      :error => task.errors
    }, :status => 404
    end
  end

  private
    def task_params
      params.require(:task).permit(:title)
    end
end
