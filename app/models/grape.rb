
class Grape < ActiveRecord::Base

  def self.formatted   # For d3 plot format

    months =
      [ ["Aug",8], ["Sep",9], ["Oct",10], ["Nov",11],
        ["Dec",12],["Jan",1], ["Feb",2],  ["Mar",3],
        ["Apr",4], ["May",5], ["Jun",6], ["Jul",7]
      ]

    array=[]

    (2009..2014).each do |year|

      mkt_year = year.to_s + "/" + ((year - 2000)+1).to_s
      grape_yr = Grape.all.find_by(Market_year: mkt_year)

      months.each do |month|

        if (grape_yr[month[0]] != 0)

          grape_yr_formatted = {}
          grape_yr_formatted["price"] = grape_yr[month[0]]
          grape_yr_formatted["month"] = month[1]

          if (month[1] >= 8)
            grape_yr_formatted["year"] = year
          else
            grape_yr_formatted["year"] = year+1
          end

          grape_yr_formatted["day"] = 1

          array.push(grape_yr_formatted)

        end

      end

    end

    @data = [{"name": "Grapes"},{"data": array}]

  end

end
