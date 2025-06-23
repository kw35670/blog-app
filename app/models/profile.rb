class Profile < ApplicationRecord
  enum :gender, { male: 0, female: 1, other: 2 }
  belongs_to :user
  has_one_attached :avatar

  def age
    '不明' unless birthday.present?
    Time.zone.now.year
    years = Time.zone.now.year - birthday.year
    days = Time.zone.now.yday - birthday.yday

    if days < 0
      "#{years - 1}"
    else
      "#{years}歳"
    end
  end
end
