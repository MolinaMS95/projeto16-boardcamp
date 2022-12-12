import express from "express";
import cors from "cors";
import categoriesRoutes from "./routes/categories.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import customersRoutes from "./routes/customers.routers.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(categoriesRoutes);
app.use(gamesRoutes);
app.use(customersRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port: ${port}`));
