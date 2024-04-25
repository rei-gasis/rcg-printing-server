import express from "express";
import dotenv from "dotenv";
import customerRequests from "./server/routes/customerRequestsRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { log } from "console";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 20 })
);

// const __dirname = process.env.BASE_URL;
// console.log(__dirname);

// app.use(express.static(__dirname + "/public/"));

app.get("/api", (req, res) => {
  res.send("API running");
});

app.use("/api/customer-req", customerRequests);

app.listen(PORT, () =>
  console.log(`Server running. listening to PORT ${PORT}`)
);
