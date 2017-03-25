class BoardsController < ApplicationController
  def index
    respond_to :json
    if current_user
      render :json => {:user => current_user}, :status => 200
    else
      render :json => {:error => 'Please log in.'}, :status => 422
    end
  end
end
