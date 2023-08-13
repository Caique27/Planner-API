import express from "express";
import routes from "./routes/index.js";
import cors from "cors";

const main = express();
main.use(express.json());
main.use(cors());
routes(main);

export default main;
