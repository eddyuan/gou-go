class Api::V1::UsersController < ApplicationController
  before_action :authorize_user, except: :create
  before_action :find_user, only: %i[update destroy]

  # GET /users
  def index
    @users = User.all
    render json: @users, status: :ok
  end

  # GET /users/{username}
  def show
    render json: @user, status: :ok
  end

  # POST /users
  def create
    @user = User.new(user_params)
    if @user.save
      render json: JsonWebToken.userJson(@user), status: :created
    else
      render json: {
               errors: @user.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end

  # PUT /users/{username}
  def update
    unless @user.update(user_params)
      render json: {
               errors: @user.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end

  # DELETE /users/{username}
  def destroy
    @user.destroy
  end

  private

  def find_user
    @user = User.find_by_email!(params[:_email])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: "User not found" }, status: :not_found
  end

  def user_params
    params.permit(
      :profile_img_url,
      :first_name,
      :last_name,
      :email,
      :address,
      :password,
      :password_confirmation,
      :is_sitter
    )
  end
end
