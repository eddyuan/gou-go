class CreatePetsBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :pets_bookings, id: false do |t|
      t.references :pets, null: false, foreign_key: true
      t.references :bookings, null: false, foreign_key: true
    end
  end
end
