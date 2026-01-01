import express from "express";
import {
  deleteNotes,
  getAllNotes,
  getNotesbyId,
  newNotes,
  updateNotes,
} from "../controllers/noteControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNotesbyId);

router.post("/", newNotes);

router.put("/:id", updateNotes);

router.delete("/:id", deleteNotes);

export default router;
