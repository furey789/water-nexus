
class StaticPagesController < ApplicationController

  def index

    respond_to do |format|
      almonds = Almond.formatted
      walnuts = Walnut.formatted
      grapes = Grape.formatted
      @produce_data = [almonds,walnuts,grapes]
      format.html  # need this line
      format.json { render json: @produce_data}
    end

  end

end
