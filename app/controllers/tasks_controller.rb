class TasksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    respond_to :json, :html
    render :json => {
      :boards => current_user.boards.map {|board| {
       :title => board.title,
       :updatedAt => "#{distance_of_time_in_words_to_now(board.updated_at)} ago",
       :id => board.id
      }}
    }, :status => 200
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
    task = Task.new(task_params)
    list = List.find(params[:list_id])
    task.list = list
    task.user = current_user
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
