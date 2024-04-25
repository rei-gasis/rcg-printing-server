import express from "express";
import { reqQuote } from "../controllers/customerRequestsController.js";
import multerConfig from "../util/multer.js";

const router = express.Router();

router.route("/req-quote").post(multerConfig.single("attachment"), reqQuote);
// router.route("/req-quote").post(reqQuote);

export default router;
