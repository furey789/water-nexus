# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150621223226) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "almonds", force: :cascade do |t|
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

  create_table "datepalms", force: :cascade do |t|
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

  create_table "grapes", force: :cascade do |t|
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

  create_table "pistachios", force: :cascade do |t|
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

  create_table "tumblr_blogs", force: :cascade do |t|
    t.string   "post_id"
    t.string   "post_date"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "walnuts", force: :cascade do |t|
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
