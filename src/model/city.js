const mongoose = require("mongoose");
const moment = require("moment");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const citySchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  city: { type: String, required: true, trim: true },
  start_date: { type: Date, required: true, trim: true },
  end_date: { type: Date, required: true, trim: true },
  price: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true },
  color: { type: String, required: true, trim: true },
});
citySchema.plugin(AutoIncrement, { inc_field: "id" });
citySchema.methods.toJSON = function () {
  const city = this;
  const cityObj = city.toObject();

  cityObj.start_date = moment(city.start_date).format("M/DD/YYYY");
  cityObj.end_date = moment(city.end_date).format("M/DD/YYYY");

  delete cityObj._id;
  delete cityObj.__v;
  return cityObj;
};

const City = mongoose.model("city", citySchema);

module.exports = City;
