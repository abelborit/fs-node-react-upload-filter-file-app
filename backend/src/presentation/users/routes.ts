import { Router } from "express";
import { UsersController } from "./controller";

export class UsersRoutes {
  static get routes(): Router {
    const router = Router();

    const usersController = new UsersController();

    router.get("/", usersController.getUsers);

    return router;
  }
}
