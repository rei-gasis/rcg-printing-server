import express from "express";
import dotenv from "dotenv";
import customerRequests from "./server/routes/customerRequestsRoutes.js";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "node:fs";

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
app.use("/static", express.static("public"));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// try {
//   const imageData = fs.readFileSync(
//     __dirname + "/public/images/assets/rcg-logo.svg",
//     "binary"
//   );
//   if (imageData) console.log(imageData);
// } catch (error) {}

app.get("/api", (req, res) => {
  res.send("API running");
});

app.use("/api/customer-req", customerRequests);

app.listen(PORT, () =>
  console.log(`Server running. listening to PORT ${PORT}`)
);
