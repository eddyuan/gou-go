Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    namespace :v1 do
      # resources :users, param: :_email
      post "/register", to: "users#create"
      post "/login", to: "authentication#login"

      get "/sitters", to: "sitters#index"
      get "/sitter", to: "sitters#show"
      post "/sitter/delete", to: "sitter#destroy"
      post "/sitter/edit", to: "sitter#edit"

      get "/bookings", to: "bookings#index"
      get "/booking", to: "bookings#show"
      post "/booking/create", to: "bookings#create"
      post "/booking/delete", to: "bookings#destroy"

      get "/pets", to: "pets#index"
      get "/pet", to: "pets#show"
      post "/pet/edit", to: "pets#edit"
      post "/pet/delete", to: "pets#destroy"

      get "/*a", to: "application#not_found"
    end
  end
  # get "/*a", to: "application#not_found"
end
