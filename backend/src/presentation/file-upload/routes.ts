import { Router } from "express";
import { FileUploadController } from "./controller";

export class FileUploadRoutes {
  /* aquí se utiliza static functions porque como no se hará inyección de dependencias entonces no sería necesario instsanciar la clase AppRoutes y solo se coloca directo. También se están usando el get function para tener otra forma de realizar esta función, se podría realizar sin ese get (son solo diferentes formas de hacerlo) */
  static get routes(): Router {
    const router = Router();

    const fileUploadController = new FileUploadController();

    router.post("/single", fileUploadController.uploadSingleFile);

    return router;
  }
}
