import { Router } from "express";

import {
  getAll,
  getById,
  postCreate,
  putUpdate,
  deleteRemove,
} from "../controller/clients-controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", postCreate);
router.put("/:id", putUpdate);
router.delete("/:id", deleteRemove);

export default router;
