
class TumblrBlog < ActiveRecord::Base

  def self.content
    # TumblrBlog.pluck("content")
    TumblrBlog.pluck("content").join(" ").split(' ').sort
    # .count("water")

  end

end
