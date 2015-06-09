class CreateTumblerBlogs < ActiveRecord::Migration
  def change
    create_table :tumbler_blogs do |t|
      t.string :post_id
      t.string :post_date
      t.text :content
      t.timestamps
    end
  end
end
