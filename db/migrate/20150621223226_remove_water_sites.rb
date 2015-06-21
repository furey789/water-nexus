class RemoveWaterSites < ActiveRecord::Migration
  def change
    drop_table :water_sites
  end
end
