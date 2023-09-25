// @ts-nocheck
import express from "express";
import Ride from "./ride";

const app = express();
app.use(express.json());

app.post("/calculate_ride", function (req, res) {
  try {
    const ride = new Ride();
    for(const segment of req.body.segments) {
      ride.addSegment(segment.distance, new Date(segment.date));
    }
    const price = ride.calculate();
    return res.json({price});
  } catch (error) {
    res.status(422).send(error.message)
  }
});
app.listen(3000);
