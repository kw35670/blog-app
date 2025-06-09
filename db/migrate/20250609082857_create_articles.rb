class CreateArticles < ActiveRecord::Migration[8.0]
  def change
    create_table :articles do |t|
      t.string :title # 記事のタイトル
      t.text :content # 記事の本文
      t.timestamps
    end
  end
end
