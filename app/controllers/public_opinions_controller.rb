
class PublicOpinionsController < ApplicationController

  def index

    words0 = TumblrBlog.content
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
        words_all.push( word.strip )
      end
    end

    words_unique = words_all.uniq

    words_unique.each do |word|
      # word_weight_obj = {"text": word, "weight": words_all.count(word) }
      word_weight_obj = {"text" => word, "weight" => words_all.count(word) }
      word_count_array.push( word_weight_obj )
    end


    respond_to do |format|

      format.html  # need this line to render html first before json
      format.json { render json: word_count_array}

    end

  end

end
