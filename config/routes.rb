Rails.application.routes.draw do
  namespace :api do
    resources :tweets, only: :index
    get 'search', to: 'tweets#search'
     post 'tweet', to: 'tweets#tweet'
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
