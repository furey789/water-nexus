
class FarmEconomicsController < ApplicationController

  def index
  end

  def get_data
    almonds = Almond.formatted
    walnuts = Walnut.formatted
    grapes = Grape.formatted
    pistachios = Pistachio.formatted
    dates = Datepalm.formatted
    produce_data = [almonds,dates,grapes,pistachios,walnuts]
    render json: produce_data
  end

end
