
class Datepalm < ActiveRecord::Base

  def self.formatted   # For d3 plot format

    month_num_days =
      [ ["Aug",8,31], ["Sep",9,30], ["Oct",10,31], ["Nov",11,30],
        ["Dec",12,31],["Jan",1,31], ["Feb",2,28],  ["Mar",3,31],
        ["Apr",4,30], ["May",5,31], ["Jun",6,30], ["Jul",7,31]
      ]

    array=[]

    (2009..2014).each do |year|

      mkt_year = year.to_s + "/" + ((year - 2000)+1).to_s
      datepalm_yr = Datepalm.all.find_by(Market_year: mkt_year)

      month_num_days.each do |month|

        if (datepalm_yr[month[0]] != 0)

          datepalm_yr_formatted = {}
          datepalm_yr_formatted["price"] = datepalm_yr[month[0]]
          datepalm_yr_formatted["month"] = month[1]

          if (month[1] >= 8)
            datepalm_yr_formatted["year"] = year
          else
            datepalm_yr_formatted["year"] = year+1
          end

          datepalm_yr_formatted["day"] = month[2]

          array.push(datepalm_yr_formatted)

        end

      end

    end

    @data = [{"name" => "Dates"},{"data" => array}]

  end

end
