# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
def random_bool
  [true, false].sample
end

DEFAULT_PASSWORD = "111111"
CORE_USER_EMAIL = "1@1.com"
CORE_SITTER_EMAIL = "2@2.com"

BREEDS = [
  "Labrador Retriever",
  "French Bulldog",
  "German Shepherd",
  "Golden Retriever",
  "English Bulldog",
  "Poodle",
  "Beagle",
  "Rottweiler"
]

# PetBooking.destroy_all
Review.destroy_all
Pet.destroy_all
Booking.destroy_all
Sitter.destroy_all
User.destroy_all

# Create a core user for testing
core_user =
  User.create(
    first_name: "FirstName",
    last_name: "LastName",
    email: CORE_USER_EMAIL,
    profile_img_url: "https://loremflickr.com/640/640/meals?random=50",
    password: DEFAULT_PASSWORD,
    address: Faker::Address.full_address
  )

# Create pets for core user
4.times do |n|
  Pet.create(
    name: Faker::Name.first_name,
    age: rand(1..10),
    breed: BREEDS.sample,
    weight: rand(1.0..20.0),
    sex: rand(1..2),
    user_id: core_user.id
  )
end

core_user = User.find_by(id: core_user.id)

# Create core sitter user
core_sitter_user =
  User.create(
    first_name: "SitterName",
    last_name: "SitterLastName",
    email: CORE_SITTER_EMAIL,
    profile_img_url: "https://loremflickr.com/640/640/meals?random=50",
    password: DEFAULT_PASSWORD,
    address: Faker::Address.full_address
  )

# Create core sitter
core_sitter =
  Sitter.create(
    img_url: "https://loremflickr.com/640/640/dog?random=50",
    first_name: core_sitter_user.first_name,
    last_name: core_sitter_user.last_name,
    price: rand(100..5000),
    description: "123",
    postcode: Faker::Address.postcode,
    walks_per_day: rand(1..5),
    dog_weight: rand(1.0..20.0),
    user_id: core_sitter_user.id
  )

# Create reviews for core sitter
rand(4..5).times do |n|
  Review.create(
    rating: rand(1..5),
    body: Faker::Hipster.sentence,
    user_id: core_sitter_user.id,
    sitter_id: core_sitter.id
  )
end

4.times do |n|
  booking =
    Booking.create(
      price: rand(1000..9000),
      time: Faker::Time.forward(days: rand(1..20)),
      duration: [30, 60, 90, 120].sample,
      user_id: core_user.id,
      sitter_id: core_sitter.id,
      pets: core_user.pets
    )
  # user.pets.each do |pet|
  #   pet_booking = PetBooking.create(pet_id: pet.id, booking_id: booking.id)
  # end
end

100.times do |n|
  username = Faker::Name.first_name
  user =
    User.create(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      email: "#{username}@1.com",
      profile_img_url: "https://loremflickr.com/640/640/meals?random=#{n + 1}",
      password: DEFAULT_PASSWORD,
      address: Faker::Address.full_address
    )
  if random_bool
    sitter =
      Sitter.create(
        img_url: "https://loremflickr.com/640/640/dog?random=50",
        first_name: user.first_name,
        last_name: user.last_name,
        price: rand(100..5000),
        description: "123",
        postcode: Faker::Address.postcode,
        walks_per_day: rand(1..5),
        dog_weight: rand(1.0..20.0),
        user_id: user.id
      )
  else
    rand(1..4).times do |n|
      pet =
        Pet.create(
          name: Faker::Name.first_name,
          age: rand(1..10),
          breed: BREEDS.sample,
          weight: rand(1.0..20.0),
          sex: rand(1..2),
          user_id: user.id
        )
    end
  end
end

users = User.all
sitters = Sitter.all
pets = Pet.all

sitters.each do |sitter|
  rand(1..5).times do |n|
    Review.create(
      rating: rand(1..5),
      body: Faker::Hipster.sentence,
      user_id: users.sample.id,
      sitter_id: sitter.id
    )
  end
end

reviews = Review.all

users.each do |user|
  p user.sitter
  if (user.pets.count > 0)
    rand(1..4).times do |n|
      booking =
        Booking.create(
          price: rand(1000..9000),
          time: Faker::Time.forward(days: rand(1..20)),
          duration: [30, 60, 90, 120].sample,
          user_id: user.id,
          sitter_id: sitters.sample.id,
          pets: user.pets
        )
      # user.pets.each do |pet|
      #   pet_booking = PetBooking.create(pet_id: pet.id, booking_id: booking.id)
      # end
    end
  end
end
# 200.time do |n|
#   Booking.create()
# end

bookings = Booking.all
# petbookings = PetBooking

p "Create #{users.count} users, #{sitters.count} sitters, #{pets.count} pets, #{reviews.count} reviews, #{bookings.count} bookings,"
