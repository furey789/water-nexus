class CreateAlmonds < ActiveRecord::Migration
  def change
    create_table :almonds do |t|
      t.string :Units
      t.string :Market_year
      t.decimal :Aug
      t.decimal :Sep
      t.decimal :Oct
      t.decimal :Nov
      t.decimal :Dec
      t.decimal :Jan
      t.decimal :Feb
      t.decimal :Mar
      t.decimal :Apr
      t.decimal :May
      t.decimal :Jun
      t.decimal :Jul
      t.timestamps
    end
  end
end
