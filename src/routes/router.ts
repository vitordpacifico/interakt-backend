import { Router } from "express";
import BottlesController from "../controller/bottles-controller";
import ConversionController from "../controller/conversion-controller";
import UserController from "../controller/user-controller";

const router = Router();

router.post("/bottle", async (req, res) => {
  const response = await BottlesController.registerBottle(req);
  res.status(response.status).send(response.message);
});

router.get("/bottle", async (req, res) => {
  const response = await BottlesController.getBottle(req);
  res.status(response.status).send(response.message);
});

router.get("/bottle/especific", async (req, res) => {
  const response = await BottlesController.getBottleByNameAndYear(req);
  res.status(response.status).send(response.message);
});

router.get("/conversion", async (_, res) => {
  const response = await ConversionController.getConversion();
  res.status(response.status).send(response.message);
});

router.post("/user", async (req, res) => {
  const response = await UserController.registerUser(req);
  res.status(response.status).send(response.message);
});

router.get("/user", async (req, res) => {
  const response = await UserController.getUserByEmailAndPassword(req);
  res.status(response.status).send(response.message);
});

router.post("/user/bottle", async (req, res) => {
  const response = await UserController.registerBottleToUser(req);
  res.status(response.status).send(response.message);
});

export default router;
