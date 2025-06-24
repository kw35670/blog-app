# frozen_string_literal: true

# == Schema Information
#
# Table name: articles
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  title      :string           not null
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_articles_on_user_id  (user_id)
#

class Article < ApplicationRecord
  validates :title, presence: true
  validates :title, length: { minimum: 2, maximum: 100 }
  validates :title, format: { with: /\A(?!@)/ }
  validates :content, presence: true
  validates :content, length: { minimum: 10 }
  validates :content, uniqueness: true

  validate :validate_title_and_content_length

  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  belongs_to :user

  def display_created_at
    I18n.l(created_at, format: :default)
  end

  def author_name
    user.display_name
  end

  def like_count
    likes.count
  end

  private

  def validate_title_and_content_length
    char_count = title.length + content.length
    errors.add(:content, '10文字以上でお願いします') unless char_count > 10
  end
end
