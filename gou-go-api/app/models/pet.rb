class Pet < ApplicationRecord
  belongs_to :user
  has_many :pet_bookings, dependent: :destroy
  has_many :bookings, through: :pet_bookings
end
