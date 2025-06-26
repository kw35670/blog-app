module ArticleDecorator
  def author_name
    user.display_name
  end

  def display_created_at
    I18n.l(created_at, format: :default)
  end

  def like_count
    likes.count
  end
end
