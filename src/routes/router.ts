import { Router } from "express";
import BottlesController from "../controller/bottles-controller";

const router = Router();

router.post('/bottle', async (req, res) => {
    const response = await BottlesController.registerBottle(req);
    res.status(response.status).send(response.message);
});

export default router;  