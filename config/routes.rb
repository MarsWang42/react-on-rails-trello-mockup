Rails.application.routes.draw do
  root 'react_app#index'
  get 'board/:id', to: 'react_app#index'
  get 'tasks/:id/archive', to: 'archived_tasks#create'
  authenticate :user do
    resources :boards, only: [:index, :create, :show, :edit, :update, :destroy] do
      resources :lists, only: [:create], shallow: true do
        resources :tasks, only: [:create]
      end
      resources :archived_tasks, only: [:index]
    end
    resources :tasks, only: [:show]
  end
  devise_for :users, path: "user",
    :controllers => {
      :sessions  => "users/sessions",
      :registrations => "users/registrations",
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
