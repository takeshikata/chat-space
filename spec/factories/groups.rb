FactoryBot.define do
  factory :group do #class: Groupをつければfactoryの名前を変えられる
    name {Faker::Team.name}
  end
end
