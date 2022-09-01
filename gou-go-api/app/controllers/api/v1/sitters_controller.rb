class Api::V1::SittersController < ApplicationController
  before_action :authorize_user, except: %i[index show]

  def index
    @sitters = Sitter.all
    render json: @sitters, status: :ok
  end

  def show
    render json: @sitter, status: :ok
  end

  def create
    @sitter = Sitter.new(sitter_params)
    if @sitter.save
      render json: @sitter, status: :created
    else
      render json: {
               errors: @sitter.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end

  def update
    unless @sitter.update(user_params)
      render json: {
               errors: @sitter.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    @sitter.destroy
  end

  private

  def find_sitter
    @sitter = Sitter.find_by_id!(params[:_id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: "Sitter not found" }, status: :not_found
  end

  def sitter_params
    params.permit(
      :img_url,
      :first_name,
      :last_name,
      :price,
      :description,
      :postcode,
      :walks_per_day,
      :dog_weight,
      :user_id
    )
  end
end
