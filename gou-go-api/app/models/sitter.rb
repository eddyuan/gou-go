class Sitter < ApplicationRecord
  belongs_to :user
  # validates :first_name, presence: true
  # validates :last_name, presence: true
  # validates :price, presence: true
  # validates :img_url, presence: true
  # validates :description, presence: true
  # validates :postcode, presence: true
  # validates :walks_per_day, presence: true
  # validates :dog_weight, presence: true
end