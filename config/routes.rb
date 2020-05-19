Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  #root "messages#index" ChatSpaceの場合はメッセージ一覧ではなく、グループ一覧を表示させる
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]

    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end
