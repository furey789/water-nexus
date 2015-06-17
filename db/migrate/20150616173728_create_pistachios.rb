class CreatePistachios < ActiveRecord::Migration
  def change
    create_table :pistachios do |t|
      t.string   "Units"
      t.string   "Market_year"
      t.decimal  "Aug"
      t.decimal  "Sep"
      t.decimal  "Oct"
      t.decimal  "Nov"
      t.decimal  "Dec"
      t.decimal  "Jan"
      t.decimal  "Feb"
      t.decimal  "Mar"
      t.decimal  "Apr"
      t.decimal  "May"
      t.decimal  "Jun"
      t.decimal  "Jul"
      t.datetime "created_at"
      t.datetime "updated_at"
    end
  end
end
