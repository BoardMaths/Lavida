import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

import {
  createGenre,
  updateGenre,
  removeGenre,
  listGenres,
  readGenre,
} from "../controllers/genreController.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createGenre);

router.route("/:id").put(authenticate, authorizeAdmin, updateGenre);
router.route("/:id").delete(authenticate, authorizeAdmin, removeGenre);
router.route("/:id").get(readGenre);
router.route("/genres").get(listGenres);

export default router;
