class BoardsController < ApplicationController
  include ActionView::Helpers::DateHelper
  skip_before_action :verify_authenticity_token

  def index
    respond_to :json, :html
    render :json => {
      :boards => current_user.boards.map {|board| {
       :title => board.title,
       :updatedAt => "#{distance_of_time_in_words_to_now(board.updated_at)} ago",
       :boardId => board.id
      }}
    }, :status => 200
  end

  def show
    respond_to :json, :html
    begin
      board = current_user.boards.find(params[:id])
      render :json => {
        :title => board.title,
        :lists => board.lists
      }, :status => 200
    rescue
      render :json => {
        :error => "Board cannot be found."
      }, :status => 404
    end
  end

  def create
    respond_to :json, :html
    board = Board.new(board_params)
    board.users << current_user
    if board.save
      render :json => {
        :board => board
      }, :status => 201
    else
      warden.custom_failure!
      render :json => {
        :error => board.errors
      }, :status => 422
    end
  end

  private
    def board_params
      params.require(:board).permit(:title)
    end
end
