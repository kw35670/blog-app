# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root to: 'articles#index'
  resource :timeline, only: [:show]

  resources :articles do
    resources :comments, only: [:index, :new, :create]
    resource :like, only: [:show, :create, :destroy]
  end

  resources :accounts, only: [:show] do
    resources :follows, only: [:create]
    resources :unfollows, only: [:create]
  end

  resource :profile, only: [:show, :edit, :update]
  resources :favorites, only: [:index]
end
