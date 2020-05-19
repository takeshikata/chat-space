class Api::MessagesController < ApplicationController #名前空間で２つのコントローラーを区別
  def index
    group = Group.find(params[:group_id])
    last_message_id = params[:id].to_i
    # 取得したグループのメッセージから、idがlast_message_idよりも新しい(大きい)メッセージのみを取得
    @messages = group.messages.includes(:user).where("id > ?", last_message_id)
  end
end
