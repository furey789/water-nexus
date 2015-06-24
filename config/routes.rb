Rails.application.routes.draw do

  root 'static_pages#index'
  resources :nexus_items, only: [:index]
  resources :water_conditions, only: [:index]
  resources :farm_economics, only: [:index]
  resources :public_opinions, only: [:index]

  get '/farm_economics/data', to: 'farm_economics#get_data'
  get '/water_conditions/data', to: 'water_conditions#get_data'

end
