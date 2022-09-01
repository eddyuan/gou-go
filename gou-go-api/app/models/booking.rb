class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :sitter
  has_and_belongs_to_many :pets
end
