Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    namespace :v1 do
      # resources :users, param: :_email
      post "/register", to: "users#create"
      get "/sitters", to: "sitters#index"
      post "/login", to: "authentication#login"
      get "/*a", to: "application#not_found"
    end
  end
  # get "/*a", to: "application#not_found"
end
