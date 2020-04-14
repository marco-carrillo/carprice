//***********************************/
//  Define the Book Mongoose model  */
//***********************************/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  id: String,
  vin: String,
  heading: String,
  price: Number,
  miles: Number,
  msrp: Number,
  data_source: String,
  vdp_url: String,
  carfax_1_owner: Boolean,
  carfax_clean_title: Boolean,
  exterior_color: String,
  interior_color: String,
  dom: Number,
  dom_180: Number,
  dom_active: Number,
  seller_type: String,
  inventory_type: String,
  stock_no: String,
  last_seen_at: Number,
  last_seen_at_date: String,
  scraped_at: Number,
  scraper_at_date: String,
  first_seen_at: Number,
  first_seen_at_date: String,
  ref_price: Number,
  ref_miles: Number,
  ref_mile_dt: Number,
  source: String,
  availability_status: String,
  media: {photo_links: [String]},
  dealer: {
            id: Number,
            website: String,
            name: String,
            dealer_type: String,
            street: String,
            city: String,
            state: String,
            country: String,
            latitude: String,
            longitude: String,
            zip: String
  },
  build: {
            year: Number,
            make: String,
            model: String,
            trim: String,
            body_type: String,
            vehicle_type: String,
            transmission: String,
            drivetrain: String,
            fuel_type: String,
            engine: String,
            engine_size: Number,
            engine_block: String,
            doors: Number,
            cylinders: Number,
            made_in: String,
            overall_height: String,
            overall_width: String,
            std_seating: String
  },
  dist: Number,
  date: { type: Date, default: Date.now }
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
