class CreateLikes < ActiveRecord::Migration[8.0]
  def change
    create_table :likes do |t|
      t.references :user
      t.references :article, null: false
      t.timestamps
    end
  end
end
