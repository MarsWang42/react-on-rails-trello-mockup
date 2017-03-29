class ListsController < ApplicationController
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
        :lists => board.lists.map {|list| {
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
    list = List.new(list_params)
    board = Board.find(params[:board_id])
    board.touch
    list.board = board
    list.user = current_user
    if list.save
      render :json => {
        :list => {
          :title => list.title,
          :tasks => list.tasks,
          :id => list.id,
        }
      }, :status => 200
    else render :json => {
      :error => list.error
    }, :status => 404
    end
  end

  def update
    respond_to :json, :html
    user_boards = current_user.boards
    list = List.find(params[:id])
    if user_boards.include? list.board and list.update_attributes list_params
      render :json => {
        :list => {
          :title => list.title,
          :tasks => list.tasks,
          :id => list.id,
        }
      }, :status => 200
    else render :json => {
      :error => list.errors
    }, :status => 404
    end
  end

  private
    def list_params
      params.require(:list).permit(:title)
    end
end
