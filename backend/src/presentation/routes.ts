import { Request, Response, Router } from "express";

export class AppRoutes {
  /* aquí se utiliza static functions porque como no se hará inyección de dependencias entonces no sería necesario instanciar la clase AppRoutes y solo se colocaría directamente. También se están usando el get function para tener otra forma de realizar esta función, se podría realizar sin ese get (son solo diferentes formas de hacerlo) */
  static get routes(): Router {
    const router = Router();

    /* Routes de las API */
    /* este sería un middelware básicamente porque es una función que se va a ejecutar cuando pase la ruta por aquí en "/api/todos" */
    // router.use("/api/todos", TodosRoutes.routes); // ejemplo de lo que podría crearse a futuro para usar en este archivo de routes
    router.post("/api/upload-files", (request: Request, response: Response) => {
      response
        .status(201)
        .json({ data: [], message: "file uploated successfully" });
    });

    router.get("/api/users", (request: Request, response: Response) => {
      response
        .status(200)
        .json({ data: [], message: "users obtained successfully" });
    });

    return router;
  }
}
