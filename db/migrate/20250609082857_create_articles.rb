class CreateArticles < ActiveRecord::Migration[8.0]
  def change
    create_table :articles do |t|
      t.references :user, null: false
      t.string :title, null: false # 記事のタイトル
      t.text :content, null: false # 記事の本文
      t.timestamps
    end
  end
end
