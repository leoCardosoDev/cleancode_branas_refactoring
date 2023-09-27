// @ts-nocheck
import express from "express";
import CalculateRide from "./application/usecase/calculate_ride";
import CreatePassenger from "./application/usecase/create_passenger";
import CreateDriver from "./application/usecase/create_driver";
import GetPassenger from "./application/usecase/get_passenger";
import GetDriver from "./application/usecase/get_driver";
import DriverRepositoryDatabase from "./infra/repository/driver_repository_database";
import PassengerRepositoryDatabase from "./infra/repository/passenger_repository_database";

const app = express();
app.use(express.json());

app.post("/calculate_ride", async function (req, res) {
  try {
    const usecase = new CalculateRide();
    const output = await usecase.execute(req.body)
    return res.json(output);
  } catch (error: any) {
    res.status(422).send(error.message)
  }
});

app.post("/passengers", async function(req, res) {
  try {
    const usecase = new CreatePassenger(new PassengerRepositoryDatabase());
    const output = await usecase.execute(req.body)
    res.json(output);
  } catch (error: any) {
    res.status(422).send(error.message)
  }
});

app.get("/passengers/:passengerId", async function(req, res){
  const usecase = new GetPassenger(new PassengerRepositoryDatabase());
  const output = await usecase.execute({passengerId: req.params.passengerId});
  res.json(output);
});

app.post("/drivers", async function(req, res) {
  try {
    const usecase = new CreateDriver(new DriverRepositoryDatabase());
    const output = await usecase.execute(req.body)
    res.json(output);
  } catch (error: any) {
    res.status(422).send(error.message)
  }
});

app.get("/drivers/:driverId", async function(req, res){
  const usecase = new GetDriver(new DriverRepositoryDatabase());
  const output = await usecase.execute({driverId: req.params.driverId});
  res.json(output);
});
app.listen(3000);
