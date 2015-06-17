
class FarmEconomicsController < ApplicationController

  def index

    respond_to do |format|
      almonds = Almond.formatted
      walnuts = Walnut.formatted
      grapes = Grape.formatted
      pistachios = Pistachio.formatted
      dates = Datepalm.formatted
      produce_data = [almonds,dates,grapes,pistachios,walnuts]
      format.html  # need this line to render html first before json
      format.json { render json: produce_data}
    end

  end

end
