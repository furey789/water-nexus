
class Walnut < ActiveRecord::Base

  def self.formatted   # For d3 plot format

    months =
      [ ["Aug",8], ["Sep",9], ["Oct",10], ["Nov",11],
        ["Dec",12],["Jan",1], ["Feb",2],  ["Mar",3],
        ["Apr",4], ["May",5], ["Jun",6], ["Jul",7]
      ]

    array=[]

    (2009..2014).each do |year|

      mkt_year = year.to_s + "/" + ((year - 2000)+1).to_s
      walnut_yr = Walnut.all.find_by(Market_year: mkt_year)

      months.each do |month|

        walnut_yr_formatted = {}
        walnut_yr_formatted["price"] = walnut_yr[month[0]]
        walnut_yr_formatted["month"] = month[1]

        if (month[1] >= 8)
          walnut_yr_formatted["year"] = year
        else
          walnut_yr_formatted["year"] = year+1
        end

        walnut_yr_formatted["day"] = 1

        array.push(walnut_yr_formatted)

      end

    end

    @data = [{"name": "Walnuts"},{"data": array}]

  end

end
