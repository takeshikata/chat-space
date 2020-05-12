Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  #root "messages#index" ChatSpaceの場合はメッセージ一覧ではなく、グループ一覧を表示させる
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
  #resources :groups, only: [:index, :new, :create, :edit, :update]
end
