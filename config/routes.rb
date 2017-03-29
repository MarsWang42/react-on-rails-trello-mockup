Rails.application.routes.draw do
  root 'react_app#index'
  get 'board/:id', to: 'react_app#index'
  get 'tasks/:id/archive', to: 'archived_tasks#create'
  get 'lists/:id/archive', to: 'archived_lists#create'
  authenticate :user do
    resources :boards, only: [:index, :create, :show, :edit, :update, :destroy] do
      resources :lists, only: [:create, :update], shallow: true do
        resources :tasks, only: [:create, :update]
      end
      resources :archived_tasks, only: [:index]
    end
    resources :tasks, only: [:show]
  end
  devise_for :users, path: "user", :skip => [:sessions, :password, :registration]
  as :user do
    post "/user/sign_in" => "users/sessions#create", :as => :user_session
    delete "/user/sign_out" => "users/sessions#destroy", :as => :destroy_user_session
    post "/user" => "users/registrations#create", :as => :user_registration
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
