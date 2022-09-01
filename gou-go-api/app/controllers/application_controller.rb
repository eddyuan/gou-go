class ApplicationController < ActionController::API
  def not_found
    render json: { error: "not_found" }
  end

  def authorize_user
    header = request.headers["Authorization"]
    header = header.split(" ").last if header
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end

  def client_user
    authorize_user
    if @current_user.is_sitter
      render json: { errors: "You are a sitter!" }, status: :method_not_allowed
    end
  end

  def sitter_user
    authorize_user
    if !@current_user.is_sitter
      render json: {
               errors: "You are not a sitter!"
             },
             status: :method_not_allowed
    end
  end
end
