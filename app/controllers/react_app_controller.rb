class ReactAppController < ApplicationController
  def index
    @hello_world_props = {
      user: {
        isSignedIn: user_signed_in?,
        currentUser: current_user,
      }
    }
  end
end
