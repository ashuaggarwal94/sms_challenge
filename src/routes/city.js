const express = require("express");
const router = new express.Router();
const City = require("./../model/city");

router.get("", async (req, res) => {
  // for pagination taking up skip and limit
  let skip = req.query.skip !== undefined ? parseInt(req.query.skip) : 0;
  let limit = req.query.limit !== undefined ? parseInt(req.query.limit) : 10;

  // for filtering out on the basis of start and end date
  let start_date =
    req.query.start !== undefined ? new Date(req.query.start) : undefined;
  let end_date =
    req.query.end !== undefined ? new Date(req.query.end) : undefined;

  //for sorting up the result
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "asc" ? 1 : -1;
  }
  try {
    let data;
    if (start_date !== undefined || end_date !== undefined) {
      let serachCriteria = {};
      if (start_date) serachCriteria.start_date = { $gte: start_date };
      if (end_date) serachCriteria.end_date = { $lte: end_date };
      data = await City.find(serachCriteria)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .exec();
    } else data = await City.find().skip(skip).limit(limit).sort(sort).exec();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.post("", async (req, res) => {
  let city = new City(req.body);
  try {
    await city.save();
    res.send(city);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", async (req, res) => {
  let id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "city",
    "start_date",
    "end_date",
    "price",
    "status",
    "color",
  ];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) res.status(400).send({ error: "Invalid operations" });

  try {
    let city = await City.findOne({ id });
    updates.forEach((update) => (city[update] = req.body[update]));
    await city.save();
    res.send(city);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let city = await City.findOneAndDelete({ id });
    if (city) res.status(200).send(city);
    else res.status(400).json({ message: "no data found" });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
