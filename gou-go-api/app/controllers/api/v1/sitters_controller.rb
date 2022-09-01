class Api::V1::SittersController < ApplicationController
  before_action :authorize_user, only: %i[create]
  before_action :sitter_user, only: %i[update destroy]
  before_action :find_sitter, only: %i[show]
  before_action :find_own_sitter, only: %i[destroy update]

  def index
    @sitters = Sitter.all
    render json: @sitters.map { |sitter| sitter.json }, status: :ok
  end

  def show
    render json: @sitter.json, status: :ok
  end

  def create
    @sitter = Sitter.new(sitter_create_params)
    @sitter.user_id = current_user.id
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
    unless @own_sitter.update(sitter_edit_params)
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
    @sitter = Sitter.find_by!(id: params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: "Sitter not found" }, status: :not_found
  end

  def find_own_sitter
    @own_sitter = Sitter.find_by!(id: current_user.id)
  rescue ActiveRecord::RecordNotFound
    render json: { errors: "You are not a sitter" }, status: :not_found
  end

  def sitter_create_params
    params.permit(
      :img_url,
      :first_name,
      :last_name,
      :price,
      :description,
      :postcode,
      :walks_per_day,
      :dog_weight
    )
  end

  def sitter_edit_params
    params.permit(
      :img_url,
      :first_name,
      :last_name,
      :price,
      :description,
      :postcode,
      :walks_per_day,
      :dog_weight
    )
  end
end
