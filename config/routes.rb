Rails.application.routes.draw do

  root 'static_pages#index'
  resources :water_conditions, only: [:index]
  resources :farm_economics, only: [:index]
  resources :public_opinions, only: [:index]

end
