class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :sitter
  has_many :pet_bookings, dependent: :destroy
  has_many :pets, through: :pet_bookings
end
