class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :sitter
  has_many :pet_bookings, dependent: :destroy
  has_many :pets, through: :pet_bookings

  def json
    { **self.attributes, pets: self.pets, sitter: self.sitter }
  end
end
