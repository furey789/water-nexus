
class Walnut < ActiveRecord::Base

  def self.formatted   # For d3 plot format

    month_num_days =
      [ ["Aug",8,31], ["Sep",9,30], ["Oct",10,31], ["Nov",11,30],
        ["Dec",12,31],["Jan",1,31], ["Feb",2,28],  ["Mar",3,31],
        ["Apr",4,30], ["May",5,31], ["Jun",6,30], ["Jul",7,31]
      ]

    array=[]

    (2009..2014).each do |year|

      mkt_year = year.to_s + "/" + ((year - 2000)+1).to_s
      walnut_yr = Walnut.all.find_by(Market_year: mkt_year)

      month_num_days.each do |month|

        if (walnut_yr[month[0]] != 0)

          walnut_yr_formatted = {}
          walnut_yr_formatted["price"] = walnut_yr[month[0]]
          walnut_yr_formatted["month"] = month[1]

          if (month[1] >= 8)
            walnut_yr_formatted["year"] = year
          else
            walnut_yr_formatted["year"] = year+1
          end

          walnut_yr_formatted["day"] = month[2]

          array.push(walnut_yr_formatted)

        end

      end

    end

    @data = [{"name" => "Walnuts"},{"data" => array}]

  end

end
