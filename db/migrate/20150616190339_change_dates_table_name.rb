class ChangeDatesTableName < ActiveRecord::Migration
  def change
    rename_table :dates, :datepalms
  end
end
