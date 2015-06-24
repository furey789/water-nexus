
class PublicOpinionsController < ApplicationController

  def index

  end

  def get_data
    opinion_data = Opinion.new
    render json: opinion_data.get_data
  end

end
