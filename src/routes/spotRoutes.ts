import { Router } from "express";
import {
  createSpot,
  getSpots,
  getSpotById,
  updateSpot,
  deleteSpot,
} from "../controllers/spotController";

const router = Router();

router.get("/", getSpots);
router.get("/:id", getSpotById);
router.post("/", createSpot);
router.put("/:id", updateSpot);
router.delete("/:id", deleteSpot);

export default router;
