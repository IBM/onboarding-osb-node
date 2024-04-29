import * as express from "express";
import { authentification } from "../middlewares/authentification";
import { MovieController } from "../controllers/movie.controllers";
import { authorization } from "../middlewares/authorization";

const Router = express.Router();

Router.get("/movies", authentification, MovieController.getAllMovies);
Router.post("/movies", authentification, MovieController.createMovie);

Router.put(
  "/movies/:id",
  authentification,
  authorization(["admin"]),
  MovieController.updateMovie
);
Router.delete(
  "/movies/:id",
  authentification,
  authorization(["admin"]),
  MovieController.deleteMovie
);
export { Router as movieRouter };
