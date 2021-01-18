Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  resources :votes
  resources :questions
  resources :answers

  root 'questions#index'
end
