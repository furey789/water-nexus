
class WaterData

  def initialize
    @conn = Faraday.new(:url => 'http://waterservices.usgs.gov')
  end

  def getDataThen
    endpoint = "/nwis/dv/?format=json,1.1&bBox=-124.25,36.75,-118.50,42.10&siteType=LK&startDT=2009-03-01&endDT=2009-03-01"
    response = @conn.get do |req|
      req.url endpoint
      req.headers['Content-Type'] = 'application/json'
    end
    JSON.parse(response.body, symbolize_names: true)
  end

  def getDataNow
    endpoint = "/nwis/dv/?format=json,1.1&bBox=-124.25,36.75,-118.50,42.10&siteType=LK&startDT=2015-03-01&endDT=2015-03-01"
    response = @conn.get do |req|
      req.url endpoint
      req.headers['Content-Type'] = 'application/json'
    end
    JSON.parse(response.body, symbolize_names: true)
  end

end
