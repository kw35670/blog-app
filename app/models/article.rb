# frozen_string_literal: true
# == Schema Information
#
# Table name: articles
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_articles_on_user_id  (user_id)
#

class Article < ApplicationRecord
  has_one_attached :eyecatch
  has_rich_text :content

  validates :title, presence: true
  validates :title, length: { minimum: 2, maximum: 100 }
  validates :title, format: { with: /\A(?!@)/ }
  validates :content, presence: true

  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  belongs_to :user

  def display_created_at
    I18n.l(created_at, format: :default)
  end

  

  def like_count
    likes.count
  end
end
