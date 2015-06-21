class CreateWaterSites < ActiveRecord::Migration
  def change
    create_table :water_sites do |t|
      t.string :name
      t.string :code
      t.string :latitude
      t.string :longitude
      t.text :description
    end
  end
end
