class Users::SessionsController < Devise::SessionsController
  # GET /user/sign_in
  def new
    redirect_to '/'
  end

  # POST /user/sign_in
  def create
    respond_to do |format|
      format.html{ super }
      format.json do
        resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
        return sign_in_and_redirect(resource_name, resource)
      end
    end
  end

  # DELETE /user/sign_out
  def destroy
    respond_to do |format|
      format.html{ super }
      format.json do
        redirect_path = after_sign_out_path_for(resource_name)
        signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
        code = signed_out ? "S_OK" : "FA_UNKNOWN_ERROR";
        render :json => {
          :code => code,
          :redirect => redirect_path,
          :csrfParam => request_forgery_protection_token,
          :csrfToken => form_authenticity_token,
        }
      end
    end
  end

  def sign_in_and_redirect(resource_or_scope, resource=nil)
    scope = Devise::Mapping.find_scope!(resource_or_scope)
    resource ||= resource_or_scope
    sign_in(scope, resource) unless warden.user(scope) == resource
    respond_to do |format|
      format.json do
        render :json => {
          :redirect => stored_location_for(scope) || after_sign_in_path_for(resource),
          :csrfParam => request_forgery_protection_token,
          :csrfToken => form_authenticity_token,
          :currentUser => current_user,
        }, :status => 201
      end
      format.html do
        redirect_to root_url
      end
    end
  end

  def failure
    user = User.find_by_email(params[:user][:email])
    code = nil
    if user != nil
      user.valid_password?(params[:user][:password]) ? code : code = "FA_PASSWORD_ERROR"
    else
      code = "FA_USAR_NOT_EXIT"
    end

    respond_to do |format|
      format.json do
        render :json => {:code => code}, :status => 422
      end
    end
  end

end
