
class PublicOpinionsController < ApplicationController

  def index

    client = Tumblr::Client.new
    hash = client.posts("stateofdrought.tumblr.com")

    tumblr_blogs = []
    hash["posts"].each do |post|
      if (post["id"] != nil && post["date"] != nil && defined? post["trail"][0]["content"] != nil)
        tumblr_blogs.push(
          { "post_id" => post["id"],
            "post_date" => post["date"],
            "content" => post["trail"][0]["content"]
          })
      end
    end
    # p tumblr_blogs[0]["post_date"]
    # p tumblr_blogs[5]["post_date"]
    # p tumblr_blogs[tumblr_blogs.length-1]["post_date"]
    dates_range = [
      tumblr_blogs[tumblr_blogs.length-1]["post_date"][0..9],
      tumblr_blogs[0]["post_date"][0..9]
      ]

    contents =[]
    tumblr_blogs.each do |blog|
      contents.push(blog["content"])
    end

    # words0 = TumblrBlog.content
    words0 = contents.join(" ").split(' ').sort
    words1 = []
    words2 = []
    words_all = []
    word_count_array = []

    words0.each do |word|
      # gsub dashes below have different encodings
      words1.push( word.gsub(/[\/\-<>\"\—\–\“\”\’\:\?\,\.\(\)]/," ") )
    end

    words1.each do |word|
      words2.push( word.split(" ") )
    end
    words2 = words2.flatten

    words2.each do |word|
      # includes removing 'href='' and 'target='; deleting white space
      if ( word.length > 3 && word.index("=") === nil && word.index("#") === nil && word.index("_") === nil)
        word_stripped = word.strip
        words_all.push( word_stripped )
      end
      # if (word_stripped != "http") #&& word_stripped.index("1") === nil)
      #     words_all.push( word_stripped )
      # end
    end

    words_unique = words_all.uniq

    words_unique.each do |word|
      # word_weight_obj = {"text": word, "weight": words_all.count(word) }
      word_weight_obj = {"text" => word, "weight" => words_all.count(word) }
      word_count_array.push( word_weight_obj )
    end


    respond_to do |format|

      format.html  # need this line to render html first before json
      format.json { render json: [dates_range, word_count_array] }

    end

  end

end
