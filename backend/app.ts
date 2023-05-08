import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { authorRouter } from "./controller/author.routes"
import { bookRouter } from "./controller/book.routes"
import { categoryRouter } from "./controller/category.routes";
import { countryRouter } from "./controller/country.routes";




const app = express();
dotenv.config();

const port = process.env.APP_PORT || 3000

const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "library_api",
      version: "1.0.0",
    },
  },
  apis: ["./controller/*.routes.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);

app.use(cors());
app.use(bodyParser.json());
app.use("/authors", authorRouter)
app.use("/books", bookRouter)
app.use("/categories", categoryRouter)
app.use("/countries", countryRouter)






app.get("/status", (req, res) => {
  res.json({ message: "Back-end is running..." });
});


app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Back-end is running on port ${port}.`);
});
