// @ts-nocheck
import express from "express";
import { calculate } from "./ride_calculator"

const app = express();
app.use(express.json());

app.post("/calculate_ride", function (req, res) {
  for(const segment of req.body.segments){
    segment.date = new Date(segment.date)
  }
  const price = calculate(req.body.segments)
  return res.json({price});
});
app.listen(3000);
