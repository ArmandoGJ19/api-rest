import express from "express";
import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import {createRoles} from "./libs/initialSetup.js";
const app = express();

createRoles();

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Bienvenido a mi API");
})
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
export default app;