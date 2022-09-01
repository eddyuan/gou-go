class User < ApplicationRecord
  has_secure_password
  has_one :sitter, dependent: :destroy
  has_many :pets, dependent: :destroy
  has_many :reviews, dependent: :nullify
  has_many :r_reviews, class_name: "Review", through: :sitter, source: :reviews
  has_many :bookings, through: :pets
  #   mount_uploader :profile_img_url, AvatarUploader
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  #   validates :username, presence: true, uniqueness: true
  validates :password,
            length: {
              minimum: 6
            },
            if: -> { new_record? || !password.nil? }
end
