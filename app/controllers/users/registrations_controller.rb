class Users::RegistrationsController < Devise::RegistrationsController
  def new
    redirect_to '/'
  end

  def create
    respond_to do |format|
      format.html { super }
      format.json do
        user = User.new(user_params)
          if user.save
            sign_in(user, scope: :user)
            render :json => {
              :csrfParam => request_forgery_protection_token,
              :csrfToken => form_authenticity_token,
              :currentUser => user.as_json
            }, :status => 201
          else
            warden.custom_failure!
            render :json => {
              :error => user.errors
            }, :status => 422
          end
      end
    end
  end

  private
    def user_params
      params.require(:user).permit(:username, :email, :password)
    end
end
