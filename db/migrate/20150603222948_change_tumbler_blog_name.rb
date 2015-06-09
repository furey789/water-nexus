class ChangeTumblerBlogName < ActiveRecord::Migration
  def change
    rename_table :tumbler_blogs, :tumblr_blogs
  end
end
