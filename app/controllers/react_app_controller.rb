class ReactAppController < ApplicationController
  def index
    @hello_world_props = {
      user: {
        isSignedIn: user_signed_in?,
        currentUser: current_user,
        editPath: edit_user_registration_path,
        logoutPath: destroy_user_session_path,
        registrationPath: new_user_registration_path,
        loginPath: new_user_session_path,
      }
    }
  end
end
