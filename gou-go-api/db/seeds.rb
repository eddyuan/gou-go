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

User.destroy_all
Sitter.destroy_all

DEFAULT_PASSWORD = "111111"

User.create(
  first_name: "FirstName",
  last_name: "LastName",
  email: "1@1.com",
  profile_img_url: "https://loremflickr.com/640/640/meals?random=50",
  password: "111111",
  address: "4444 Kingsway, Burnaby, Canada, BC"
)

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
    Sitter.create(
      img_url: "https://loremflickr.com/640/640/dog?random=50",
      first_name: user.first_name,
      last_name: user.last_name,
      price: rand(100..5000),
      description: "123",
      postcode: Faker::Address.postcode,
      walks_per_day: rand(1..5),
      dog_weight: rand(1.0 - 20.0),
      user_id: user.id
    )
  end
end

users = User.all
sitters = Sitter.all

p "Create #{users.count} users, #{sitters.count} sitters,"
