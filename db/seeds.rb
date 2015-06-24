# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# ---------
#
# require 'csv'

# def getAlmondData
#
#   data_raw = []
#   CSV.foreach("/Users/Furey/workspace/capstone/data_farm_produce/TradeTables_almonds.csv") do |row|
#     if ( row[2] != nil && ( row[2][0] === 'M' || row[2][0] === '2' ) )
#       data_raw.push(row)
#     end
#   end
#
#   attributes = ["Market_year","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"]
#   data_col_ids = []
#
#   data_raw[0].each_with_index do |col,id|
#     if ( ["Market year"+"*"].include?(col) || attributes.include?(col) )
#       data_col_ids.push(id)
#     end
#   end
#
#   # Take data from 2009 - 2015
#   data_values = data_raw[1..6]
#
#   data_values.each do |row|
#     Almond.create!("Units": "$/lb")
#     data_col_ids.each_with_index do |colid,attrid|
#       Almond.last.update!("#{attributes[attrid]}": "#{row[colid]}")
#     end
#   end
#
# end
#
# getAlmondData


# def getWalnutData
#
#   data_raw = []
#   CSV.foreach("/Users/Furey/workspace/capstone/data_farm_produce/TradeTables_walnuts.csv") do |row|
#     if ( row[2] != nil && ( row[2][0] === 'M' || row[2][0] === '2' ) )
#       data_raw.push(row)
#     end
#   end
#
#   attributes = ["Market_year","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"]
#   data_col_ids = []
#
#   data_raw[0].each_with_index do |col,id|
#     if ( ["Market year"+"*"].include?(col) || attributes.include?(col) )
#       data_col_ids.push(id)
#     end
#   end
#
#   # Take data from 2009 - 2015
#   data_values = data_raw[1..6]
#
#   data_values.each do |row|
#     Walnut.create!("Units": "$/lb")
#     data_col_ids.each_with_index do |colid,attrid|
#       Walnut.last.update!("#{attributes[attrid]}": "#{row[colid]}")
#     end
#   end
#
# end
#
# getWalnutData


# def getGrapeData
#
#   data_raw = []
#   CSV.foreach("/Users/Furey/workspace/capstone/data_farm_produce/TradeTables_grapes.csv") do |row|
#     if ( row[2] != nil && ( row[2][0] === 'M' || row[2][0] === '2' ) )
#       data_raw.push(row)
#     end
#   end
#
#   attributes = ["Market_year","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"]
#   data_col_ids = []
#
#   data_raw[0].each_with_index do |col,id|
#     if ( ["Market year"+"*"].include?(col) || attributes.include?(col) )
#       data_col_ids.push(id)
#     end
#   end
#
#   # Take data from 2009 - 2015
#   data_values = data_raw[1..6]
#
#   data_values.each do |row|
#     # p row
#     Grape.create!("Units": "$/lb")
#     data_col_ids.each_with_index do |colid,attrid|
#       Grape.last.update!("#{attributes[attrid]}": "#{row[colid]}")
#     end
#   end
#
# end
#
# getGrapeData


# def getPistachioData
#
#   data_raw = []
#   CSV.foreach("/Users/Furey/workspace/capstone/data_farm_produce/TradeTables_pistachios.csv") do |row|
#     if ( row[2] != nil && ( row[2][0] === 'M' || row[2][0] === '2' ) )
#       data_raw.push(row)
#     end
#   end
#
#   attributes = ["Market_year","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"]
#   data_col_ids = []
#
#   data_raw[0].each_with_index do |col,id|
#     if ( ["Market year"+"*"].include?(col) || attributes.include?(col) )
#       data_col_ids.push(id)
#     end
#   end
#
#   # Take data from 2009 - 2015
#   data_values = data_raw[1..6]
#
#   data_values.each do |row|
#     p row
#     Pistachio.create!("Units": "$/lb")
#     data_col_ids.each_with_index do |colid,attrid|
#       Pistachio.last.update!("#{attributes[attrid]}": "#{row[colid]}")
#     end
#   end
#
# end
#
# getPistachioData

# def getDatepalmData
#
#   data_raw = []
#   CSV.foreach("/Users/Furey/workspace/capstone/data_farm_produce/TradeTables_datepalms.csv") do |row|
#     if ( row[2] != nil && ( row[2][0] === 'M' || row[2][0] === '2' ) )
#       data_raw.push(row)
#     end
#   end
#
#   attributes = ["Market_year","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"]
#   data_col_ids = []
#
#   data_raw[0].each_with_index do |col,id|
#     if ( ["Market year"+"*"].include?(col) || attributes.include?(col) )
#       data_col_ids.push(id)
#     end
#   end
#
#   # Take data from 2009 - 2015
#   data_values = data_raw[1..6]
#
#   data_values.each do |row|
#     # p row
#     Datepalm.create!("Units": "$/lb")
#     data_col_ids.each_with_index do |colid,attrid|
#       Datepalm.last.update!("#{attributes[attrid]}": "#{row[colid]}")
#     end
#   end
#
# end
#
# getDatepalmData


# # Tumblr
client = Tumblr::Client.new
hash = client.posts("stateofdrought.tumblr.com")

# p hash["blog"]
# p hash["posts"].length

# post_ids = TumblrBlog.pluck("post_id")

p hash["posts"].length
# p post_ids

hash["posts"].each do |post|

  # if (post_ids.index(post["id"]) != nil)

    p post["id"]
    p post["date"]

    # TumblrBlog.create!(
    #   "post_id": "#{post["id"]}",
    #   "post_date": "#{post["date"]}",
    #   "content": "#{post["trail"][0]["content"]}"
    #   )

  # end

end


## Water Site Info
# WaterSite.create!("name": "Lake Shasta", "code": "11370000")
# WaterSite.create!("name": "Lake Trinity", "code": "11525400")
# WaterSite.create!("name": "Lake Oroville", "code": "11406800")
# WaterSite.create!("name": "Folsom Lake", "code": "11446200")
# WaterSite.create!("name": "New Melones Reservoir", "code": "11299000")
# WaterSite.create!("name": "Don Pedro Reservoir", "code": "11287500")
# WaterSite.create!("name": "Lake Berryessa", "code": "11453900")
