import * as dotenv from "dotenv";
import express, { NextFunction } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { authorRouter } from "./controller/author.routes"
import { bookRouter } from "./controller/book.routes"
import { categoryRouter } from "./controller/category.routes";
import { countryRouter } from "./controller/country.routes";
import { userRouter } from "./controller/user.routes";
import { expressjwt } from "express-jwt";




const app = express();
dotenv.config();

const port = process.env.APP_PORT || 3000


const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BookHub_api",
      version: "1.0.0",
    },
  },
  apis: ["./controller/*.routes.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
const jwtSecret = process.env.JWT_SECRET


app.use(
  expressjwt({secret: jwtSecret, algorithms: ['HS256']}).unless({ 
    path: [
      // public routes that don't require authentication
      ///^\/api-docs\/.*/,
      "/users/login",
      "/users/signup"
    ]
  })
  
)

app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRouter)
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



app.use((error, req, res, next) =>{
  if(error.name === "UnauthorizedError"){
    res.status(401).json({status: "unauthorized", errorMessage:error.message})
  }else if(error.name === "Error"){
    res.status(400).json({status: "error", errorMessage:error.message})
  }else{
    next()
  }
});