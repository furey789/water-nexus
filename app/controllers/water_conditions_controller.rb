
class WaterConditionsController < ApplicationController

  def index

  end

  def get_data
    water_data = WaterData.new
    render json: [ water_data.getDataThen, water_data.getDataNow ]
  end

end
