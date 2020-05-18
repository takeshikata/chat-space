json.array! @users do |user|
  json.id  user.user.id
  json.name  user.name
end
